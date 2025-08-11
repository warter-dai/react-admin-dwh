/**
 * 重定向组件
 */
import { Navigate, Outlet } from "react-router-dom";

type RedirectRouteProps = {
  to: string;
};
const RedirectRoute = ({ to }: RedirectRouteProps) => {
  return (
    <>
      <Navigate to={to} replace />
      <Outlet />
    </>
  );
};

export default RedirectRoute;
