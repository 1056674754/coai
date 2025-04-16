import { useTranslation } from "react-i18next";
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
    const dispatch = useDispatch<AppDispatch>();
    const loginContainerRef = useRef<HTMLDivElement>(null);
    const [isQrCodeVisible, setIsQrCodeVisible] = useState(false);
    const wecomConfig = useSelector(selectWecomConfig);

    // 获取企业微信配置
    useEffect(() => {
        if (!wecomConfig) {
            dispatch(fetchWecomConfig());
        }
    }, [dispatch, wecomConfig]);

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
                {/* <img src="/wechat_work_icon.svg" alt="企业微信" className="w-5 h-5" /> */}
                {/* {isQrCodeVisible ? t("auth.hide-qrcode") : t("auth.wecom-login")} */}
                {t("auth.wecom-login")}
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
