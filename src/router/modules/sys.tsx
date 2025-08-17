import AuthLayout from "@/components/layouts/components/AuthLayout";
import RedirectRoute from "../RedirectRoute";
import LazyLoadComponent from "../LazyLoadComponent";
import { lazy } from "react";

export const constantRouterMap: IRouteObject[] = [
  {
    path: "/sys",
    element: <AuthLayout />,
    meta: {
      menu: false,
    },
    children: [
      {
        index: true,
        element: <RedirectRoute to="/sys/company"></RedirectRoute>,
      },
      {
        path: "/sys/company",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/sys/company/index"))}
          />
        ),
      },
      {
        path: "/sys/department",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/sys/department/index"))}
          />
        ),
      },
      {
        path: "/sys/permission",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/sys/permission/index"))}
          />
        ),
      },
      {
        path: "/sys/permissiongroup",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/sys/permissiongroup/index"))}
          />
        ),
      },
      {
        path: "/sys/role",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/sys/role/index"))}
          />
        ),
      },
      {
        path: "/sys/user",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/sys/user/index"))}
          />
        ),
      },
      {
        path: "/sys/menu",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/sys/menu/index"))}
          />
        ),
      },
    ],
  },
];
