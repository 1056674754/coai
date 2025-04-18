import { useToast } from "@/components/ui/use-toast.ts";
import { ToastAction } from "@/components/ui/toast.tsx";
import { tokenField } from "@/conf/bootstrap.ts";
import { useEffect, useReducer, useState } from "react";
import Loader from "@/components/Loader.tsx";
import "@/assets/pages/auth.less";
import { validateToken } from "@/store/auth.ts";
import { useDispatch } from "react-redux";
import router from "@/router.tsx";
import { useTranslation } from "react-i18next";
import { getQueryParam } from "@/utils/path.ts";
import { setMemory } from "@/utils/memory.ts";
import { appLogo, appName, useDeeptrain } from "@/conf/env.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { goAuth } from "@/utils/app.ts";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import Require, { LengthRangeRequired } from "@/components/Require.tsx";
import { Button } from "@/components/ui/button.tsx";
import { formReducer, isTextInRange } from "@/utils/form.ts";
import { doLogin, LoginForm } from "@/api/auth.ts";
import { getErrorMessage, isEnter } from "@/utils/base.ts";
import { WecomLogin } from "@/components/WecomLogin.tsx";

function DeepAuth() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = getQueryParam("token").trim();

  useEffect(() => {
    if (!token.length) {
      toast({
        title: t("invalid-token"),
        description: t("invalid-token-prompt"),
        action: (
          <ToastAction altText={t("try-again")} onClick={goAuth}>
            {t("try-again")}
          </ToastAction>
        ),
      });

      setTimeout(goAuth, 2500);
      return;
    }

    setMemory(tokenField, token);

    doLogin({ token })
      .then((data) => {
        if (!data.status) {
          toast({
            title: t("login-failed"),
            description: t("login-failed-prompt", { reason: data.error }),
            action: (
              <ToastAction altText={t("try-again")} onClick={goAuth}>
                {t("try-again")}
              </ToastAction>
            ),
          });
        } else
          validateToken(dispatch, data.token, async () => {
            toast({
              title: t("login-success"),
              description: t("login-success-prompt"),
            });

            await router.navigate("/");
          });
      })
      .catch((err) => {
        console.debug(err);
        toast({
          title: t("server-error"),
          description: `${t("server-error-prompt")}\n${err.message}`,
          action: (
            <ToastAction altText={t("try-again")} onClick={goAuth}>
              {t("try-again")}
            </ToastAction>
          ),
        });
      });
  }, []);

  return (
    <div className={`auth`}>
      <Loader prompt={t("login")} />
    </div>
  );
}

function Login() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const globalDispatch = useDispatch();
  const [form, dispatch] = useReducer(formReducer<LoginForm>(), {
    username: sessionStorage.getItem("username") || "",
    password: sessionStorage.getItem("password") || "",
  });
  // 默认使用企业微信登录
  const [loginMethod, setLoginMethod] = useState<'wecom' | 'password'>('wecom');

  const onSubmit = async () => {
    if (
      !isTextInRange(form.username, 1, 255) ||
      !isTextInRange(form.password, 6, 36)
    )
      return;

    try {
      const resp = await doLogin(form);
      if (!resp.status) {
        toast({
          title: t("login-failed"),
          description: t("login-failed-prompt", { reason: resp.error }),
        });
        return;
      }

      toast({
        title: t("login-success"),
        description: t("login-success-prompt"),
      });

      if (
        form.username.trim() === "root" &&
        form.password.trim() === "chatnio123456"
      ) {
        toast(
          {
            title: t("admin.default-password"),
            description: t("admin.default-password-prompt"),
          },
          15000,
        );
      }

      validateToken(globalDispatch, resp.token);
      await router.navigate("/");
    } catch (err) {
      console.debug(err);
      toast({
        title: t("server-error"),
        description: t("request-error", { reason: getErrorMessage(err) }),
      });
    }
  };

  useEffect(() => {
    // listen to enter key and auto submit
    const listener = async (e: KeyboardEvent) => {
      if (isEnter(e) && loginMethod === 'password') await onSubmit();
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [loginMethod]);

  // 切换登录方式
  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === 'wecom' ? 'password' : 'wecom');
  };

  return (
    <div className={`auth-container`}>
      <img className={`logo`} src={appLogo} alt="" />
      <div className={`title`}>
        {t("login")} {appName}
      </div>
      <Card className={`auth-card`}>
        <CardContent className={`pb-0`}>
          <div className={`auth-wrapper`}>
            {loginMethod === 'wecom' ? (
              <>
                {/* 企业微信登录 */}
                <WecomLogin />
                
                <div className="relative flex items-center justify-center mt-6 mb-4">
                  <div className="absolute border-t border-gray-300 w-full"></div>
                  <div className="relative bg-white px-4 text-sm text-gray-500">
                    {t("auth.or")}
                  </div>
                </div>
                
                <div 
                  onClick={toggleLoginMethod} 
                  className="w-full flex items-center justify-center mt-2 text-center cursor-pointer text-blue-600 hover:text-blue-800 hover:underline text-sm"
                >
                  {t("auth.use-password-login")}
                </div>
              </>
            ) : (
              <>
                {/* 账号密码登录 */}
                <Label>
                  <Require />
                  {t("auth.username-or-email")}
                  <LengthRangeRequired
                    content={form.username}
                    min={1}
                    max={255}
                    hideOnEmpty={true}
                  />
                </Label>
                <Input
                  placeholder={t("auth.username-or-email-placeholder")}
                  value={form.username}
                  onChange={(e) =>
                    dispatch({ type: "update:username", payload: e.target.value })
                  }
                />

                <Label>
                  <Require />
                  {t("auth.password")}
                  <LengthRangeRequired
                    content={form.password}
                    min={6}
                    max={36}
                    hideOnEmpty={true}
                  />
                </Label>
                <Input
                  placeholder={t("auth.password-placeholder")}
                  value={form.password}
                  type={"password"}
                  onChange={(e) =>
                    dispatch({ type: "update:password", payload: e.target.value })
                  }
                />

                <Button onClick={onSubmit} className={`mt-2`}>
                  {t("login")}
                </Button>
                
                <div className="relative flex items-center justify-center mt-6 mb-4">
                  <div className="absolute border-t border-gray-300 w-full"></div>
                  <div className="relative bg-white px-4 text-sm text-gray-500">
                    {t("auth.or")}
                  </div>
                </div>
                
                <div 
                  onClick={toggleLoginMethod} 
                  className="w-full flex items-center justify-center text-center cursor-pointer text-blue-600 hover:text-blue-800 hover:underline text-sm"
                >
                  {t("auth.use-wecom-login")}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      <div className={`auth-card addition-wrapper`}>
        <div className={`row`}>
          {t("auth.no-account")}
          <a className={`link`} onClick={() => router.navigate("/register")}>
            {t("auth.register")}
          </a>
        </div>
        <div className={`row`}>
          {t("auth.forgot-password")}
          <a className={`link`} onClick={() => router.navigate("/forgot")}>
            {t("auth.reset-password")}
          </a>
        </div>
      </div>
    </div>
  );
}

function Auth() {
  return useDeeptrain ? <DeepAuth /> : <Login />;
}

export default Auth;
