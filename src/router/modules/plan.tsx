import AuthLayout from "@/components/layouts/components/AuthLayout";
import RedirectRoute from "../RedirectRoute";
import LazyLoadComponent from "../LazyLoadComponent";
import { lazy } from "react";

export const constantRouterMap: IRouteObject[] = [
  {
    path: "/plan",
    element: <AuthLayout />,
    meta: {
      menu: false,
    },
    children: [
      {
        index: true,
        element: <RedirectRoute to="/plan/production"></RedirectRoute>,
      },
      {
        path: "/plan/production",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/plan/production/index"))}
          />
        ),
      },
      {
        path: "/plan/purchase",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/plan/purchase/index"))}
          />
        ),
      },
    ],
  },
];
