import { useToast } from "@/components/ui/use-toast.ts";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "@/utils/base.ts";
import { useEffect, useRef, useCallback, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/index.ts";
import { selectWecomConfig, fetchWecomConfig } from "@/store/wecom.ts";

// 为企业微信登录SDK添加类型定义
declare global {
    interface Window {
        WxLogin: new (config: {
            id: string;
            appid: string;
            agentid: string;
            redirect_uri: string;
            state: string;
            href?: string;
        }) => void;
    }
}

// 企业微信登录组件
export function WecomLogin() {
    const { t } = useTranslation();
    const { toast } = useToast();
    const dispatch = useDispatch<AppDispatch>();
    const loginContainerRef = useRef<HTMLDivElement>(null);
    const [isQrCodeVisible, setIsQrCodeVisible] = useState(false);
    const [sdkLoaded, setSdkLoaded] = useState<boolean>(typeof window !== 'undefined' && typeof window.WxLogin === 'function');
    const wecomConfig = useSelector(selectWecomConfig);

    // 获取企业微信配置
    useEffect(() => {
        if (!wecomConfig) {
            dispatch(fetchWecomConfig());
        }
    }, [dispatch, wecomConfig]);

    // 初始化企业微信登录
    const initWecomLogin = useCallback(() => {
        try {
            if (!loginContainerRef.current || !sdkLoaded || !wecomConfig) return;

            // 清空容器内容
            loginContainerRef.current.innerHTML = "";

            // 创建企业微信登录对象
            new window.WxLogin({
                id: "wecom-login-container",
                appid: wecomConfig.appid,
                agentid: wecomConfig.agentid,
                redirect_uri: encodeURIComponent(wecomConfig.requestUrl),
                state: wecomConfig.state,
                href: "", // 可自定义样式
            });

            // 显示二维码
            setIsQrCodeVisible(true);
        } catch (err) {
            console.error(err);
            toast({
                title: t("server-error"),
                description: t("request-error", { reason: getErrorMessage(err) }),
            });
        }
    }, [t, toast, sdkLoaded, wecomConfig]);

    // 处理企业微信登录按钮点击 - 新实现
    const handleWecomLogin = useCallback(() => {
        // 如果二维码已显示，则隐藏二维码
        if (isQrCodeVisible) {
            setIsQrCodeVisible(false);
            if (loginContainerRef.current) {
                loginContainerRef.current.innerHTML = "";
            }
            return;
        }

        // 确保已获取微信配置
        if (!wecomConfig) {
            dispatch(fetchWecomConfig());
            return;
        }

        // 使用类似Vue3实现的方式直接重定向
        const queryParams = new URLSearchParams(window.location.search);
        // 读取redirect_uri参数的值
        // const redirectUrl = queryParams.get('redirect_uri') || '/manage';
        // const redirectUrl2 = encodeURIComponent(redirectUrl);

        const redirectUrl = '/';
        const redirectUrl2 = encodeURIComponent(redirectUrl);

        // 直接跳转到企业微信授权页面
        window.location.href = 
            `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wecomConfig.appid}` + 
            `&redirect_uri=${wecomConfig.requestUrl}?redirect_uri=${redirectUrl2}` + 
            `&response_type=code` + 
            `&scope=snsapi_privateinfo` + 
            `&agentid=${wecomConfig.agentid}` +
            `&state=${wecomConfig.state}#wechat_redirect`;
    }, [isQrCodeVisible, wecomConfig, dispatch]);

    // 检查SDK是否已加载
    useEffect(() => {
        if (typeof window !== 'undefined' && typeof window.WxLogin === 'function') {
            setSdkLoaded(true);
        }
    }, []);

    // 组件卸载时清理
    useEffect(() => {
        return () => {
            if (loginContainerRef.current) {
                loginContainerRef.current.innerHTML = "";
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center">
            <Button
                variant="outline"
                onClick={handleWecomLogin}
                className="w-full flex items-center justify-center gap-2 mb-4"
            >
                <img src="/wechat_work_icon.svg" alt="企业微信" className="w-5 h-5" />
                {isQrCodeVisible ? t("auth.hide-qrcode") : t("auth.wechat-work-login")}
            </Button>

            {/* 企业微信登录二维码容器 */}
            <div
                ref={loginContainerRef}
                id="wecom-login-container"
                className={`mt-4 ${isQrCodeVisible ? 'block' : 'hidden'}`}
            ></div>
        </div>
    );
}
