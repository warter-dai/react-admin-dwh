import AuthLayout from "@/components/layouts/components/AuthLayout";
import { lazy } from "react";
import RedirectRoute from "./RedirectRoute";
import LazyLoadComponent from "./LazyLoadComponent";
import PageNotFound from "@/views/system/404";

export const constantRouter: IRouteObject[] = [
  {
    path: "/",
    element: <AuthLayout />,
    meta: {
      menu: false,
    },
    errorElement: <PageNotFound></PageNotFound>,
    children: [
      {
        index: true,
        element: <RedirectRoute to="/laboratory/basepage"></RedirectRoute>,
      },
      {
        path: "/workspace",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/workspace/index"))}
          />
        ),
      },
      {
        path: "/404",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/system/404"))}
          />
        ),
      },
      {
        path: "/403",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/system/403"))}
          />
        ),
      },
      {
        path: "/401",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/system/401"))}
          />
        ),
      },
      {
        path: "/login",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/login/index"))}
          />
        ),
      },
      {
        path: "/redirect",
        element: <AuthLayout />,
        children: [
          {
            path: "/redirect/:path",
            element: (
              <LazyLoadComponent
                Component={lazy(() => import("@/views/system/redirect"))}
              />
            ),
          },
        ],
      },
      {
        path: "/personal",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <RedirectRoute to="/personal/center"></RedirectRoute>,
          },
          {
            path: "/personal/center",
            element: (
              <LazyLoadComponent
                Component={lazy(() => import("@/views/system/personal/index"))}
              />
            ),
          },
        ],
      },
    ],
  },
];
