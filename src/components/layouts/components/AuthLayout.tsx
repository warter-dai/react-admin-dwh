import AuthGuard from "@/router/AuthGuard";
import DefaultLayout from "./default";

function AuthLayout() {
  return (
    <AuthGuard>
      <DefaultLayout></DefaultLayout>
    </AuthGuard>
  );
}

export default AuthLayout;
