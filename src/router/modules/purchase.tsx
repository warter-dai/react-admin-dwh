import AuthLayout from "@/components/layouts/components/AuthLayout";
import RedirectRoute from "../RedirectRoute";
import LazyLoadComponent from "../LazyLoadComponent";
import { lazy } from "react";

export const constantRouterMap: IRouteObject[] = [
  {
    path: "/purchase",
    element: <AuthLayout />,
    meta: {
      menu: false,
    },
    children: [
      {
        index: true,
        element: <RedirectRoute to="/purchase/order"></RedirectRoute>,
      },
      {
        path: "/purchase/order",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/purchase/order/index"))}
          />
        ),
      },
      {
        path: "/purchase/supplier",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/purchase/supplier/index"))}
          />
        ),
      },
    ],
  },
];
