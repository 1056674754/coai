<div align="center">

![chatnio](/app/public/logo.png)

# [🥳 Chat Nio](https://chatnio.com)

#### 🚀 **下一代 AIGC 一站式商业解决方案**


[English](https://github.com/Deeptrain-Community/chatnio/blob/master/README.md) · 简体中文 · [官网](https://chatnio.com) · [社区](https://chatnio.com/guide/#%F0%9F%9B%A0%EF%B8%8F-%E7%A7%81%E6%9C%89%E5%8C%96%E9%83%A8%E7%BD%B2) · [开发者资源](https://chatnio.com/developers)

[![Chat Nio: #1 Repo Of The Day](https://trendshift.io/api/badge/repositories/6369)](https://trendshift.io/repositories/6369)

[![Chat Nio: Github Statistic](https://stats.deeptrain.net/repo/Deeptrain-Community/chatnio)](https://stats.deeptrain.net)

</div>

## 📝 功能
1. 🤖️ **丰富模型支持**: 多模型服务商支持 (OpenAI / Anthropic / Gemini / Midjourney 等十余种格式兼容 & 私有化 LLM 支持)
2. 🤯 **美观 UI 设计**: PC & Pad & 移动端三端设计兼容，国际化(多语言)支持，支持明亮/暗黑主题，遵循 [Shadcn UI](https://ui.shadcn.com) & [Tremor Charts](https://blocks.tremor.so) 设计规范，丰富美观的界面设计和后台仪表盘，健全强大的 Markdown 语法支持 (支持 **LaTeX 公式** & **Mermaid 思维导图**)
3. 🎨 **文生图支持**: 支持多种文生图模型: **OpenAI DALL-E**✅ & **Midjourney** (支持 **U/V/R** 操作)✅ & Stable Diffusion✅ 等
4. 📡 **强大对话同步**: **用户 0 成本对话跨端同步支持**，支持**对话分享** (支持链接分享 & 保存为图片 & 分享管理), **无需 WebDav / WebRTC 等依赖和复杂学习成本**
5. 🎈 **模型市场 & 预设系统**: 支持后台可自定义的模型市场, 可提供模型介绍、标签等参数, 站长可根据情况自定义模型简介。同时支持预设系统，包含 **自定义预设** 和 **云端同步** 功能。
6. 📖 **丰富文件解析**: **开箱即用**, 支持**所有模型**的文件解析 (PDF / Docx / Pptx / Excel / 图片等格式解析), **支持更多云端图片存储方案**, **支持 OCR 图片识别** 👉 详情参见项目 **[Chat Nio Blob Service](https://github.com/Deeptrain-Community/chatnio-blob-service)** (支持 Vercel / Docker 一键部署)
7. 🌏 **全模型联网搜索**: 基于 [SearXNG](https://github.com/searxng/searxng) 开源引擎, 支持 Google / Bing / DuckDuckGo / Yahoo / WikiPedia / Arxiv / Qwant 等丰富搜索引擎搜索, 支持安全搜索模式, 内容截断, 图片代理, 测试搜索可用性等功能。
8. 💕 **渐进式 Web 应用 (PWA)**: 支持 PWA 应用 & 支持桌面端 (桌面端基于 [Tauri](https://github.com/tauri-apps/tauri))
9. 🤩 **齐全后台管理**: 支持美观丰富的仪表盘, 公告&通知管理, 用户管理, 订阅管理, 礼品码&兑换码管理, 价格设定, 订阅设定, 自定义模型市场, 系统设置, SMTP 发件设置等功能
10. 🤑 **多种计费方式**: 支持 💴 **订阅制** 和 💴 **弹性计费** 两种计费方式, 弹性计费支持 次数计费 / Token 计费 / 不计费 / 可匿名调用 和 **最小请求点数** 检测等强大功能
11. 🎉 **创新模型缓存**: 支持开启模型缓存：即同一个请求入参 Hash 下, 如果之前已请求过, 将直接返回缓存结果 (击中缓存将不计费), 减少请求次数。可自行自定义是否缓存的模型、缓存时间、多种缓存结果数等高级缓存设置
12. 🥪 **附加功能** (停止支持): 🍎 **AI 项目生成器功能** / 📂 **批量文章生成功能** / 🥪 **AI 卡片功能** (已废弃)
13. 😎 **优秀渠道管理**: 自写优秀渠道算法, 支持⚡ **多渠道管理**, 支持🥳**优先级**设置渠道的调用顺序, 支持🥳**权重**设置同一优先级下的渠道均衡负载分配概率, 支持🥳**用户分组**, 🥳**渠道重试**, 🥳**模型重定向**, 🥳**内置上游隐藏**, 🥳**渠道状态管理**等强大**企业级功能**

## Preview

![Midjourney 绘图](/screenshot/code.png)
![Markdown 消息](/screenshot/latex.jpg)
![Markdown Mermaid](/screenshot/mermaid.png)
![Vision 支持](/screenshot/vision.png)
![对话分享](/screenshot/sharing.png)
![文件上传](/screenshot/file.png)
![联网搜索](/screenshot/online.png)
![编辑器](/screenshot/editor.png)
![模型市场](/screenshot/market.png)
![预设设置](/screenshot/mask.png)
![预设编辑](/screenshot/mask-editor.png)
![偏好设置](/screenshot/settings.png)
![仪表盘](/screenshot/admin.png)
![购买点数](/screenshot/shop.png)
![价格设定](/screenshot/charge.png)
![订阅计划](/screenshot/subscription.png)
![订阅设置](/screenshot/plan.png)
![模型市场设置](/screenshot/admin-market.png)
![系统设置](/screenshot/system.png)
![渠道设置](/screenshot/channel.png)
![渠道分组](/screenshot/channel-group.png)


## 🔨 支持模型
1.  OpenAI & Azure OpenAI *(✅ Vision ✅ Function Calling)*
2.  Anthropic Claude *(✅ Vision ✅ Function Calling)*
3.  Google Gemini & PaLM2 *(✅ Vision)*
4.  Midjourney *(✅ Mode Toggling ✅ U/V/R Actions)*
5.  讯飞星火 SparkDesk *(✅ Vision ✅ Function Calling)*
6.  智谱清言 ChatGLM *(✅ Vision)*
7.  通义千问 Tongyi Qwen
8.  腾讯混元 Tencent Hunyuan
9.  百川大模型 Baichuan AI
10.  月之暗面 Moonshot AI (👉 OpenAI)
11.  字节云雀 ByteDance Skylark *(✅ Function Calling)*
12.  Groq Cloud AI
13.  OpenRouter (👉 OpenAI)
14.  360 GPT
15.  LocalAI / Ollama (👉 OpenAI)

## 👻 中转 OpenAI 兼容 API
   - [x] Chat Completions _(/v1/chat/completions)_
   - [x] Image Generation _(/v1/images)_
   - [x] Model List _(/v1/models)_
   - [x] Dashboard Billing _(/v1/billing)_


## 📦 部署方式
> [[INFO]]
> 部署成功后, 管理员账号为 `root`, 密码默认为 `chatnio123456`

1. ⚡ Docker Compose 安装 (推荐)
    
    > 运行成功后, 宿主机映射地址为 `http://localhost:8000`

    ```shell
    git clone --depth=1 --branch=main --single-branch https://github.com/Deeptrain-Community/chatnio.git
    cd chatnio
    docker-compose up -d # 运行服务
   # 如需使用 stable 版本, 请使用 docker-compose -f docker-compose.stable.yaml up -d 替代
   # 如需使用 watchtower 自动更新, 请使用 docker-compose -f docker-compose.watch.yaml up -d 替代
    ```
   
   版本更新（_开启 Watchtower 自动更新的情况下, 无需手动更新_）：
   ```shell
   docker-compose down 
   docker-compose pull
   docker-compose up -d
   ```
   
   > - MySQL 数据库挂载目录项目 ~/**db**
   > - Redis 数据库挂载目录项目 ~/**redis**
   > - 配置文件挂载目录项目 ~/**config**

2. ⚡ Docker 安装 (轻量运行时, 常用于外置 _MYSQL/RDS_ 服务)
    > 运行成功后, 宿主机地址为 `http://localhost:8094`。如需使用 stable 版本, 请使用 `programzmh/chatnio:stable` 替代 `programzmh/chatnio:latest`  
    ```shell
   docker run -d --name chatnio \
      --network host \
      -v ~/config:/config \
      -v ~/logs:/logs \
      -v ~/storage:/storage \
      -e MYSQL_HOST=localhost \
      -e MYSQL_PORT=3306 \
      -e MYSQL_DB=chatnio \
      -e MYSQL_USER=root \
      -e MYSQL_PASSWORD=chatnio123456 \
      -e REDIS_HOST=localhost \
      -e REDIS_PORT=6379 \
      -e SECRET=secret \
      -e SERVE_STATIC=true \
      programzmh/chatnio:latest
    ```
   > - *--network host* 指使用宿主机网络, 使 Docker 容器使用宿主机的网络, 可自行修改
   > - SECRET: JWT 密钥, 自行生成随机字符串修改
   > - SERVE_STATIC: 是否启用静态文件服务 (正常情况下不需要更改此项, 详见下方常见问题解答)
   > - *-v ~/config:/config* 挂载配置文件, *-v ~/logs:/logs* 挂载日志文件的宿主机目录, *-v ~/storage:/storage* 挂载附加功能的生成文件
   > - 需配置 MySQL 和 Redis 服务, 请自行参考上方信息修改环境变量
    
    版本更新 （_开启 Watchtower 后无需手动更新, 执行后按照上述步骤重新运行即可_）：
    ```shell
    docker stop chatnio
    docker rm chatnio
    docker pull programzmh/chatnio:latest
   ```

3. ⚒ 编译安装
    > 部署成功后, 默认端口为 **8094**, 访问地址为 `http://localhost:8094`
    > Config 配置项 (~/config/**config.yaml**) 可以使用环境变量进行覆盖, 如 `MYSQL_HOST` 环境变量可覆盖 `mysql.host` 配置项

    ```shell
    git clone https://github.com/Deeptrain-Community/chatnio.git
    cd chatnio
   
    cd app
    npm install -g pnpm
    pnpm install
    pnpm build
   
    cd ..
    go build -o chatnio
   
    nohup ./chatnio > output.log & # using nohup to run in background
    ```

## ❓ 常见问题 Q&A
1. **为什么我部署后的站点可以访问页面, 可以登录注册, 但是无法使用聊天 (一直在转圈)？**
   - 聊天等此类功能通过 websocket 进行通信, 请确保你的服务支持 websocket。 (Tip: 中转通过 Http 实现, 无需 websocket 支持)
   - 如果你使用了 Nginx, Apache 等反向代理, 请确保已配置 websocket 支持。
   - 如果使用了端口映射, 端口转发, CDN, API Gateway 等服务, 请确保你的服务支持并开启 websocket。
2. **我配置的 Midjourney Proxy 格式的渠道一直转圈或报错 `please provide available notify url`**
   - 若为转圈，请确保你的 Midjourney Proxy 服务已正常运行, 并且已配置正确的上游地址。
   - **Midjourney 要填渠道类型要用 Midjourney 而不是 OpenAI (不知道为什么很多人填成了 OpenAI 类型格式然后过来反馈为什么empty response, mj-chat 类除外)**
   - 排查完这些问题后, 请查看你的系统设置中的**后端域名**是否已经配置并配置正确。如果不配置, 将导致 Midjourney Proxy 服务无法正常回调。
3. **此项目有什么外部依赖？**
   - MySQL: 存储用户信息, 对话记录, 管理员信息等持久化数据。
   - Redis: 存储用户快速鉴权信息, IP 速率限制, 订阅配额, 邮箱验证码等数据。
   - 环境未配置好的情况下, 会导致服务无法正常运行, 请确保你的 MySQL 和 Redis 服务已正常运行 (Docker 部署, 编译部署需自行搭建外部服务)。
4. **我的机器为 ARM 架构, 该项目支持 ARM 架构吗？**
   - 支持。Chat Nio 项目使用 BuildX 构建多架构镜像, 你可以直接使用 docker-compose 或 docker 运行, 无需额外配置。
   - 如果你使用编译安装, 直接在 ARM 机器上编译即可, 无需欸外配置。如果你使用 x86 机器编译, 请使用 `GOARCH=arm64 go build -o chatnio` 进行交叉编译并上传至 ARM 机器上运行。
5. **如何修改 Root 默认密码？**
   - 请点击右上角头像或侧边栏底部用户框进入后台管理, 点击系统设置下常规设置操作栏的 修改 Root 密码 进行修改。或者选择在 用户管理 中选定 root 用户进行修改密码操作。
6. **系统设置中的后端域名是什么？**
   - 后端域名是指后端 API 服务的地址, 默认为你访问站点后加 `/api` 的地址, 如 `https://example.com/api` 。
   - 如果设置为非 *SERVE_STATIC* 模式, 开启前后端分离部署, 请将后端域名设置为你的后端 API 服务地址, 如 `https://api.example.com`。
   - 后端域名此处用于 Midjourney Proxy 服务的后端回调地址, 如无需使用 Midjourney Proxy 服务, 请忽略此设置。
7. **如何配置支付方式？**
   - Chat Nio 开源版支持发卡模式, 设置系统设置中的购买链接为你的发卡地址即可。卡密可通过用户管理中兑换码管理中批量生成。
8. **礼品码和兑换码有什么区别？**
   - 礼品码一种类型只能一个用户只能绑定一次, 而非 aff code, 发福利等方式可使用礼品码, 可在头像下拉菜单中的礼品码中兑换。
   - 兑换码一种类型可以多个用户绑定, 可作为正常购买和发卡使用, 可在用户管理中的兑换码管理中批量生成, 在头像下拉菜单的点数（菜单第一个）内输入兑换码进行兑换。
   - 一个例子：比如我发了一个类型为 *新年快乐* 的福利, 此时推荐使用礼品码, 假设发放 100 个 66 点数, 如果为兑换码, 手快的一个用户就批量把所有兑换码的 6600 点数都用完了, 而礼品码则可以保证每个用户只能使用一次 (获得 66 点数)。
   - 而搭建发卡的时, 如果用礼品码, 因为一个类型只能兑换一次, 购买多个礼品码会导致兑换失败, 而兑换码则可以在此场景下使用。
9. **该项目支持 Vercel 部署吗？**
   - Chat Nio 本身并不支持 Vercel 部署, 但是你可以使用前后端分离模式,  Vercel 部署前端部分, 后端部分使用 Docker 部署或编译部署。
10. **前后端分离部署模式是什么？**
    - 正常情况下, 前后端在同一服务内, 后端地址为 `/api`。前后端分离部署指前端和后端分别部署在不同的服务上, 前端服务为静态文件服务, 后端服务为 API 服务。
      - 举个例子, 前端使用 Nginx (或 Vercel 等) 部署, 部署的域名为 `https://www.chatnio.net`。
      - 后端使用 Docker 部署, 部署的域名为 `https://api.chatnio.net`。
    - 此种部署方式需自行打包前端, 配置环境变量 `VITE_BACKEND_ENDPOINT` 为你的后端地址, 如 `https://api.chatnio.net`。
    - 配置后端环境变量的 `SERVE_STATIC=false` 使后端服务不提供静态文件服务。
11. **弹性计费和订阅详解**
    - 弹性计费, 即 `点数`, 其图标类似于**云**, 模型计费通用方式, 为了防止虚假汇率, 写死 10 点数 = 1 元, 汇率可以在计费规则中的 **应用内置模板** 中自定义汇率。
    - 订阅, 即订阅计划, 为固定价格计费方式按次配额, 订阅计费扣取点数 (举例: 如果站点的用户想订阅 32 元的计划, 则需要保证点数大于等于 320 点数)
    - 订阅是 Item 的组合, 每个 Item 都可设置涵盖的模型, 订阅配额 (-1 为无限使用), 名称, ID (用于区分不同的 Item), 图标等。可在后台的订阅管理中进行操作, 是否开启订阅, 订阅价格等, 修改每个订阅等级的 Item, 以及支持直接导入其他订阅等级的 Item。
    - 订阅支持分层并写死为三个等级。 等级分别为: _普通用户 (0)_, _基础版订阅 (1)_, _标准版订阅 (2)_, _专业版订阅 (3)_, 订阅等级即为用户分组, 可在渠道管理中进行高级设置, 选择勾选可使用此模型的用户分组。
    - 订阅配额设置, 可在订阅管理中进行操作, 是否支持中转 API (默认关闭)
12. **可请求最小点数检测 `user quota is not enough` 详解**
    - 为防止站点用户滥用站点模型, 当请求点数低于最小请求点数时将返回点数不足的错误信息, 大于等于最小请求点数时将正常请求。
    - 模型的最小可请求点数规则: 
        - 不计费模型无限制
        - 次数计费模型最小点数为该模型的 1 次请求点数 (e.g. 若一个模型的单次请求点数为 0.1 点数, 则最小请求点数为 0.1 点数)
        - Token 弹性计费模型为 1K 输入 Tokens 价格 + 1K 输出 Tokens 价格 (e.g. 若一个模型的 1K 输入 Tokens 价格为 0.05 点数, 1K 输出 Tokens 价格 0.1 点数, 则最小请求点数为 0.15 点数)
13. **DuckDuckGo API 搭建避坑**
    - 首先感谢 Binjie 作者的 [duckduckgo-api](https://github.com/binjie09/duckduckgo-api) 项目, 该项目为 Chat Nio 提供了联网搜索功能 (prompt 实现)。
    - DDG API 服务需要自行搭建, Binjie 作者的默认站点中时常配额被用尽, 请自行搭建并在系统设置中联网设置中设置。
    - DuckDuckGo **无法在国内环境使用**, 请使用代理或海外服务器进行搭建 DDG API 端点。
    - 部署成功后请测试 `https://your.domain/search?q=hi` 来简单测试是否搭建成功，如若无法访问，请检查你的 DDG API 服务是否正常运行或寻找原项目寻求帮助。
    - 部署成功后, 请前往系统设置中的联网设置, 设置你的 DDG API 端点地址 (不要加后缀 `/search`), 最大结果数默认为 `5` (结果数设置为 0 或负数默认为 5)
    - 现在聊天中开启联网搜索后即可正常使用, 如若还无法使用, 一般为模型问题 (如 GPT-3.5 有时会无法理解)。
    - 此联网搜索通过预设实现, 意为保证全模型都支持的通用功能, 兼容性无法保证灵敏性, 不依赖模型 Function Calling, 其他本身支持联网的模型可以选择直接关闭此功能。
14. **为何我的 GPT-4-All 等逆向模型无法使用上传文件中的图片?**
    - 上传模型图片为 Base64 格式, 如果逆向不支持 Base64 格式, 请使用 URL 直链而非上传文件做法。
15. **如何开始域名严格跨域检测?**
    - 正常情况下，后端对所有域名开放跨域。如果非特殊需求，无需开启严格跨域检测。
    - 如果需要开启严格跨域检测，可以在后端环境变量中 并配置 `ALLOW_ORIGINS`, 如 `ALLOW_ORIGINS=chatnio.net,chatnio.app` （不需要加协议前缀, www 解析无需手动添加, 后端将自动识别并允许跨域）, 这样就会支持严格跨域检测 (如 *http://www.chatnio.app*, *https://chatnio.net* 等将会被允许, 其他域名将会被拒绝)。
    - 即使在开启严格跨域检测的情况下, /v1 接口会被仍然允许所有域的跨域请求, 以保证中转 API 的正常使用。
16. **模型映射功能是如何使用的？**
    - 渠道内的模型映射格式为 `[from]>[to]`, 多个映射之间换行, **from** 为请求的模型, **to** 为真实向上游发送的模型并且需要上游真实支持
    - 如: 我有一个逆向渠道, 填写 `gpt-4-all>gpt-4`, 则我的用户请求 **gpt-4-all** 模型到该渠道时, 后端则会模型映射至 **gpt-4** 向该渠道请求 **gpt-4**, 此时该渠道支持 2 个模型, **gpt-4** 和 **gpt-4-all** (本质上都为 **gpt-4**)
    - 如果我不想让我的这个逆向渠道影响到 **gpt-4** 的渠道组, 可以加前缀 `!gpt-4-all>gpt-4`, 该渠道 **gpt-4** 则会被忽略, 此时该渠道将只支持 1 个模型, **gpt-4-all** (但本质上为 **gpt-4**)
## 📦 技术栈
- 前端: React + Radix UI + Tailwind CSS + Shadcn + Tremor + Redux
- 后端: Golang + Gin + Redis + MySQL
- 应用技术: PWA + WebSocket


## 🎃 贡献者
![Contributors](https://stats.deeptrain.net/contributor/Deeptrain-Community/chatnio/?column=6&theme=light)

## 📚 SDKs
> API 分为中转 API 和 Chat Nio 独有功能 API
> 
> 中转 API 为 OpenAI 通用格式, 支持多种格式, 详见 OpenAI API 文档和 SDKs
> 
> 下方 SDKs 为 Chat Nio 独有功能 API 的 SDKs

- [JavaScript SDK](https://github.com/Deeptrain-Community/chatnio-api-node)
- [Python SDK](https://github.com/Deeptrain-Community/chatnio-api-python)
- [Golang SDK](https://github.com/Deeptrain-Community/chatnio-api-go)
- [Java SDK](https://github.com/hujiayucc/ChatNio-SDK-Java) (感谢 [@hujiayucc](https://github.com/hujiayucc))
- [PHP SDK](https://github.com/hujiayucc/ChatNio-SDK-Php) (感谢 [@hujiayucc](https://github.com/hujiayucc))
## ✨ 优秀开源项目
> **此处偏前端项目指偏向用户聊天界面的项目, 偏后端项目指偏向于 API 中转和管理的项目, 一站式指包含用户聊天界面和 API 中转和管理的项目*
- [Next Chat @yidadaa](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web) （偏前端项目）
- [Lobe Chat @arvinxx](https://github.com/lobehub/lobe-chat) （偏前端项目）
- [Chat Box @bin-huang](https://github.com/Bin-Huang/chatbox) （偏前端项目）
- [OpenAI Forward @kenyony](https://github.com/KenyonY/openai-forward) （偏后端项目）
- [One API @justsong](https://github.com/songquanpeng/one-api) （偏后端项目）
- [New API @calon](https://github.com/Calcium-Ion/new-api) （偏后端项目）
- [FastGPT @labring](https://github.com/labring/FastGPT) （知识库）
- [Quivr @quivrhq](https://github.com/StanGirard/quivr) （知识库）
- [Bingo @weaigc](https://github.com/weaigc/bingo) （模型库）
- [Midjourney Proxy @novicezk](https://github.com/novicezk/midjourney-proxy) （模型库）


## 📄 开源协议
Apache License 2.0

## ❤ 捐助
[@Sh1n3zZ](https://github.com/Sh1n3zZ) [@4EvEr](https://github.com/3081394176)

- [晞云 LightXi](https://open.lightxi.com) 提供字体 CDN 支持
- [BootCDN](https://bootcdn.cn) 和 [Static File](https://staticfile.org) 提供资源 CDN 支持

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=zmh-program/chatnio&type=Date)](https://star-history.com/#zmh-program/chatnio&Date)

## 写在最后
Chat Nio 偏向于一站式服务, 集合了用户聊天界面和 API 中转和管理的项目。
- 相对于 NextChat 等偏前端轻量部署的项目,  Chat Nio 优势在于更便捷的云端同步、账号管理、更丰富的分享等功能, 以及计费管理系统。
- 相对于 OneAPI 等偏后端轻量部署的项目,  Chat Nio 优势在于更丰富的用户界面, 同时渠道管理体系功能更多, 更丰富的用户管理, 并推出偏向用户界面的订阅管理系统。

一站式服务的优势在于, 用户可以在一个站点上完成所有的操作, 无需频繁切换站点, 更加便捷。
包括查看自己的点数, 消息的点数消耗, 订阅配额都更加便捷, 使用聊天界面的同时, 开放了中转 API 和 Chat Nio 独有功能 API。

同时，我们力求做到 Chat Nio > Next Chat + One API, 实现更加丰富的功能和更加细节的体验。

同时附加一点, 由于开发者仍然在上学, Chat Nio 的开发进度可能会受到影响。如果我们认为此 issue 为非必要, 我们将延后处理, 或者选择直接关闭, 不接受任何形式的催促。
我们非常欢迎 PR 贡献, 并献上我们的感谢。
