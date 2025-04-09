import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validateToken } from "@/store/auth.ts";
import { useToast } from "@/components/ui/use-toast.ts";
import { useTranslation } from "react-i18next";
import Loader from "@/components/Loader.tsx";

export function LoginSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { t } = useTranslation();
  
  useEffect(() => {
    const token = searchParams.get("token");
    
    if (token) {
      // 验证并保存token
      validateToken(dispatch, token);
      
      toast({
        title: t("login-success"),
        description: t("login-success-prompt"),
      });
      
      // 跳转到首页
      navigate("/");
    } else {
      toast({
        title: t("login-failed"),
        description: t("login-failed-prompt", { reason: "Invalid token" }),
      });
      navigate("/login");
    }
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  );
}
