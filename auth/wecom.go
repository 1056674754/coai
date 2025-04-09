package auth

import (
    "chat/globals"
    "chat/utils"
    "encoding/json"
    "errors"
    "fmt"
    "io/ioutil"
    "net/http"
    "net/url"
    "strings"
    
    "github.com/gin-gonic/gin"
    "github.com/spf13/viper"
)

// 微信企业号配置
type WecomConfig struct {
    Enabled     bool   `mapstructure:"enabled"`
    CorpID      string `mapstructure:"corp_id"`
    AgentID     string `mapstructure:"agent_id"`
    Secret      string `mapstructure:"secret"`
    RedirectURI string `mapstructure:"redirect_uri"`
}

// 获取微信企业号配置
func GetWecomConfig() *WecomConfig {
    config := &WecomConfig{}
    if err := viper.UnmarshalKey("Wecom_work", config); err != nil {
        globals.Warn(fmt.Sprintf("failed to read Wecom_work config: %s", err.Error()))
        return &WecomConfig{Enabled: false}
    }
    return config
}

// 微信API响应结构
type WecomTokenResponse struct {
    ErrCode     int    `json:"errcode"`
    ErrMsg      string `json:"errmsg"`
    AccessToken string `json:"access_token"`
    ExpiresIn   int    `json:"expires_in"`
}

type WecomUserInfoResponse struct {
    ErrCode  int    `json:"errcode"`
    ErrMsg   string `json:"errmsg"`
    UserID   string `json:"userid"`
    Name     string `json:"name"`
    Email    string `json:"email"`
    Mobile   string `json:"mobile"`
    Avatar   string `json:"avatar"`
    Position string `json:"position"`
}

// 获取微信企业号访问令牌
func GetWecomAccessToken(config *WecomConfig) (string, error) {
    if !config.Enabled {
        return "", errors.New("Wecom work login is disabled")
    }
    
    url := fmt.Sprintf("https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=%s&corpsecret=%s", 
        config.CorpID, config.Secret)
    
    resp, err := http.Get(url)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()
    
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return "", err
    }
    
    var tokenResp WecomTokenResponse
    if err := json.Unmarshal(body, &tokenResp); err != nil {
        return "", err
    }
    
    if tokenResp.ErrCode != 0 {
        return "", fmt.Errorf("Wecom error: %s", tokenResp.ErrMsg)
    }
    
    return tokenResp.AccessToken, nil
}

// 使用访问令牌获取用户信息
func GetWecomUserInfo(accessToken string, userID string) (*WecomUserInfoResponse, error) {
    url := fmt.Sprintf("https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=%s&userid=%s", 
        accessToken, userID)
    
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return nil, err
    }
    
    var userInfo WecomUserInfoResponse
    if err := json.Unmarshal(body, &userInfo); err != nil {
        return nil, err
    }
    
    if userInfo.ErrCode != 0 {
        return nil, fmt.Errorf("Wecom error: %s", userInfo.ErrMsg)
    }
    
    return &userInfo, nil
}

// 微信认证处理
func WecomAuthAPI(c *gin.Context) {
    config := GetWecomConfig()
    if !config.Enabled {
        c.JSON(http.StatusOK, gin.H{
            "status": false,
            "error":  "Wecom work login is disabled",
        })
        return
    }
    
    state := utils.GenerateChar(16)
    redirectURI := url.QueryEscape(config.RedirectURI)
    
    // 设置state到缓存，用于回调验证
    cache := utils.GetCacheFromContext(c)
    cache.Set(c, fmt.Sprintf("nio:Wecom:state:%s", state), "1", 300) // 5分钟有效期
    
    // 构建企业微信授权URL
    authURL := fmt.Sprintf(
        "https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=%s&agentid=%s&redirect_uri=%s&state=%s",
        config.CorpID, config.AgentID, redirectURI, state)
    
    c.JSON(http.StatusOK, gin.H{
        "status": true,
        "url":    authURL,
    })
}

// 微信认证回调
func WecomCallbackAPI(c *gin.Context) {
    config := GetWecomConfig()
    if !config.Enabled {
        c.JSON(http.StatusOK, gin.H{
            "status": false,
            "error":  "Wecom work login is disabled",
        })
        return
    }
    
    code := c.Query("code")
    state := c.Query("state")
    
    if code == "" || state == "" {
        c.JSON(http.StatusOK, gin.H{
            "status": false,
            "error":  "invalid code or state",
        })
        return
    }
    
    // 验证state
    cache := utils.GetCacheFromContext(c)
    _, err := cache.Get(c, fmt.Sprintf("nio:Wecom:state:%s", state)).Result()
    if err != nil {
        c.JSON(http.StatusOK, gin.H{
            "status": false,
            "error":  "invalid state or state expired",
        })
        return
    }
    
    // 清除state缓存
    cache.Del(c, fmt.Sprintf("nio:Wecom:state:%s", state))
    
    // 获取access_token
    accessToken, err := GetWecomAccessToken(config)
    if err != nil {
        c.JSON(http.StatusOK, gin.H{
            "status": false,
            "error":  err.Error(),
        })
        return
    }
    
    // 获取用户ID
    url := fmt.Sprintf("https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=%s&code=%s", 
        accessToken, code)
    
    resp, err := http.Get(url)
    if err != nil {
        c.JSON(http.StatusOK, gin.H{
            "status": false,
            "error":  err.Error(),
        })
        return
    }
    defer resp.Body.Close()
    
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        c.JSON(http.StatusOK, gin.H{
            "status": false,
            "error":  err.Error(),
        })
        return
    }
    
    var userIdResp struct {
        ErrCode int    `json:"errcode"`
        ErrMsg  string `json:"errmsg"`
        UserID  string `json:"UserId"`
    }
    
    if err := json.Unmarshal(body, &userIdResp); err != nil {
        c.JSON(http.StatusOK, gin.H{
            "status": false, 
            "error":  "failed to parse user info",
        })
        return
    }
    
    if userIdResp.ErrCode != 0 {
        c.JSON(http.StatusOK, gin.H{
            "status": false,
            "error":  userIdResp.ErrMsg,
        })
        return
    }
    
    // 获取用户详细信息
    userInfo, err := GetWecomUserInfo(accessToken, userIdResp.UserID)
    if err != nil {
        c.JSON(http.StatusOK, gin.H{
            "status": false,
            "error":  err.Error(),
        })
        return
    }
    
    // 使用用户信息进行登录或注册
    token, err := WecomLogin(c, userInfo)
    if err != nil {
        c.JSON(http.StatusOK, gin.H{
            "status": false,
            "error":  err.Error(),
        })
        return
    }
    
    // 设置前端登录成功的重定向
    frontendURL := "/login/success?token=" + token
    c.Redirect(http.StatusFound, frontendURL)
}

// 微信用户登录/注册
func WecomLogin(c *gin.Context, userInfo *WecomUserInfoResponse) (string, error) {
    db := utils.GetDBFromContext(c)
    
    // 尝试通过微信ID查找已存在用户
    var user User
    var exists bool
    
    // 首先检查是否有该微信企业号ID对应的用户
    var userID int64
    err := globals.QueryRowDb(db, 
        "SELECT user_id FROM oauth WHERE provider = 'Wecom_work' AND provider_id = ?", 
        userInfo.UserID).Scan(&userID)
    
    if err == nil {
        // 找到已关联的用户
        exists = true
        err = globals.QueryRowDb(db, 
            "SELECT id, username, password FROM auth WHERE id = ?", 
            userID).Scan(&user.ID, &user.Username, &user.Password)
        
        if err != nil {
            return "", errors.New("failed to find associated user")
        }
    } else {
        // 没有关联用户，尝试通过邮箱查找
        if userInfo.Email != "" {
            err = globals.QueryRowDb(db, 
                "SELECT id, username, password FROM auth WHERE email = ?", 
                userInfo.Email).Scan(&user.ID, &user.Username, &user.Password)
            
            if err == nil {
                exists = true
                // 找到邮箱对应的用户，建立关联
                _, err = globals.ExecDb(db, 
                    "INSERT INTO oauth (user_id, provider, provider_id, provider_data) VALUES (?, ?, ?, ?)",
                    user.ID, "Wecom_work", userInfo.UserID, "")
                
                if err != nil {
                    globals.Warn(fmt.Sprintf("failed to link Wecom account to existing user: %s", err.Error()))
                }
            }
        }
    }
    
    if !exists {
        // 需要注册新用户
        if globals.CloseRegistration {
            return "", errors.New("this site is not open for registration")
        }
        
        // 生成用户名，避免冲突
        username := fmt.Sprintf("wx_%s", strings.ToLower(userInfo.UserID))
        if len(username) > 32 {
            username = username[:32]
        }
        
        // 检查用户名是否已存在
        for i := 0; i < 10; i++ {
            if !IsUserExist(db, username) {
                break
            }
            username = fmt.Sprintf("wx_%s_%d", strings.ToLower(userInfo.UserID), i)
            if len(username) > 32 {
                username = username[:32]
            }
        }
        
        // 生成随机密码
        password := utils.GenerateChar(16)
        hash := utils.Sha2Encrypt(password)
        
        user = User{
            Username: username,
            Password: hash,
            Email:    userInfo.Email,
            BindID:   getMaxBindId(db) + 1,
            Token:    utils.Sha2Encrypt(userInfo.UserID + username),
        }
        
        // 插入用户数据
        result, err := globals.ExecDb(db, `
            INSERT INTO auth (username, password, email, bind_id, token)
            VALUES (?, ?, ?, ?, ?)
            `, user.Username, user.Password, user.Email, user.BindID, user.Token)
        
        if err != nil {
            return "", err
        }
        
        user.ID, _ = result.LastInsertId()
        
        // 建立微信与用户的关联
        _, err = globals.ExecDb(db, 
            "INSERT INTO oauth (user_id, provider, provider_id, provider_data) VALUES (?, ?, ?, ?)",
            user.ID, "Wecom_work", userInfo.UserID, "")
        
        if err != nil {
            globals.Warn(fmt.Sprintf("failed to link Wecom account to new user: %s", err.Error()))
        }
        
        // 设置初始配额
        user.CreateInitialQuota(db)
    }
    
    // 检查用户是否被禁用
    if user.IsBanned(db) {
        return "", errors.New("current user is banned")
    }
    
    // 生成登录令牌
    return user.GenerateToken()
}
