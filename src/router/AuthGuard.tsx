import AppLoading from "@/components/Loading";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type AuthGuardProps = {
  children: React.ReactNode;
};

// 使用自定义守卫组件
function AuthGuard({ children }: AuthGuardProps) {
  //   const { isAuthenticated } = useAuth();
  const isAuthenticated = true;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: location },
        replace: true,
      });
    }
  }, [isAuthenticated, navigate, location]);

  return isAuthenticated ? children : <AppLoading />;
}

export default AuthGuard;
