import { useToast } from "@/components/ui/use-toast.ts";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "@/utils/base.ts";
import axios from "axios";
import { Button } from "@/components/ui/button.tsx";

export function WecomLogin() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleWechatLogin = async () => {
    try {
      const response = await axios.get("/api/wechat/auth");
      if (response.data.status && response.data.url) {
        // 跳转到企业微信扫码页面
        window.location.href = response.data.url;
      } else {
        toast({
          title: t("login-failed"),
          description: t("login-failed-prompt", { reason: response.data.error || "Unknown error" }),
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: t("server-error"),
        description: t("request-error", { reason: getErrorMessage(err) }),
      });
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleWechatLogin} 
      className="w-full flex items-center justify-center gap-2"
    >
      <img src="/wechat_work_icon.svg" alt="企业微信" className="w-5 h-5" />
      {t("auth.wechat-work-login")}
    </Button>
  );
}
