import AuthLayout from "@/components/layouts/components/AuthLayout";
import RedirectRoute from "../RedirectRoute";
import LazyLoadComponent from "../LazyLoadComponent";
import { lazy } from "react";

export const constantRouterMap: IRouteObject[] = [
  {
    path: "/sale",
    element: <AuthLayout />,
    meta: {
      menu: false,
    },
    children: [
      {
        index: true,
        element: <RedirectRoute to="/sale/order"></RedirectRoute>,
      },
      {
        path: "/sale/customer",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/sale/customer/index"))}
          />
        ),
      },
      {
        path: "/sale/order",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/sale/order/index"))}
          />
        ),
      },
    ],
  },
];
