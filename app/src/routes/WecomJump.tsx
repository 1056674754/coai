import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/index.ts";
import { setToken, updateData } from "@/store/auth.ts";
import { loginWithWecom } from "@/api/wecom.ts";
import { selectWecomConfig, fetchWecomConfig } from "@/store/wecom.ts";
import axios from "axios";
import { doState } from "@/api/auth";

export default function WecomJump() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const wecomConfig = useSelector(selectWecomConfig);

  // 获取code参数
  const code = searchParams.get("code");
  // 获取redirect_uri参数
  const redirectUri = searchParams.get("redirect_uri");

  // 加载企业微信配置
  useEffect(() => {
    if (!wecomConfig) {
      dispatch(fetchWecomConfig());
    }
  }, [dispatch, wecomConfig]);

  useEffect(() => {
    if (!code) {
      toast({
        title: t("login-failed"),
        description: t("login-failed-prompt", { reason: "缺少授权码" }),
      });
      navigate("/login");
      return;
    }

    // 确保已获取微信配置
    if (!wecomConfig) {
      return;
    }

    // 使用code登录
    handleWecomLogin(code);
  }, [code, wecomConfig]);

  // 使用企业微信授权码登录
  const handleWecomLogin = async (code: string) => {
    try {
      setLoading(true);
      const response = await loginWithWecom({
        code,
        agentid: wecomConfig ? wecomConfig.agentid : "", // 从配置获取
        state: wecomConfig ? wecomConfig.state : "", // 从wecomConfig获取state
      });

      if (response.data.status === true) {
        // 登录成功
        const token = response.data.token;
        
        // 保存token到Redux状态
        dispatch(setToken(token));
        
        // 获取用户信息
        try {
        //   const userResponse = await axios.get("/info", {
        //     headers: { Authorization: `Bearer ${token}` }
        //   });

          
        //   if (userResponse.data.status === true) {
        //     // 更新用户信息到Redux
        //     dispatch(updateData({
        //       authenticated: true,
        //       username: userResponse.data.user,
        //       admin: userResponse.data.admin || false
        //     }));
        //   }

            doState()
            .then(
                (data) => {
                    dispatch(
                        updateData({
                        authenticated: data.status,
                        username: data.user,
                        admin: data.admin,
                        }),
                    );
                    
                }
            )
            .catch((err) => {
                // keep state
                console.debug(err);
            });



        } catch (error) {
          console.error("获取用户信息失败", error);
        }

        // 跳转到指定页面或默认页面
        if (redirectUri) {
          const decodedUrl = decodeURIComponent(redirectUri);
          navigate(decodedUrl);
        } else {
          navigate("/");
        }

        toast({
          title: t("login-success"),
          description: t("login-success-prompt"),
        });
      } else {
        // 登录失败
        toast({
          title: t("login-failed"),
          description: t("login-failed-prompt", { reason: response.data.error || "未知错误1" }),
        });
        navigate("/login");
      }
    } catch (error: any) {
      console.error("企业微信登录失败", error);
      toast({
        title: t("login-failed"),
        description: t("login-failed-prompt", { reason: error.message || "未知错误2" }),
      });
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-xl font-semibold mb-4">{t("auth.processing")}</div>
      {loading ? (
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      ) : null}
    </div>
  );
} 