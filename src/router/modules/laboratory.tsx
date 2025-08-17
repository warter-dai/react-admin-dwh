import AuthLayout from "@/components/layouts/components/AuthLayout";
import RedirectRoute from "../RedirectRoute";
import LazyLoadComponent from "../LazyLoadComponent";
import { lazy } from "react";

export const constantRouterMap: IRouteObject[] = [
  {
    path: "/laboratory",
    element: <AuthLayout />,
    meta: {
      menu: false,
    },
    children: [
      {
        index: true,
        element: <RedirectRoute to="/laboratory/video"></RedirectRoute>,
      },
      {
        path: "/laboratory/video",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/laboratory/video/index"))}
          />
        ),
      },
      {
        path: "/laboratory/chatroom",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/laboratory/ChatRoom/index"))}
          />
        ),
      },
      {
        path: "/laboratory/chatroom/:id",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/laboratory/ChatRoom/box"))}
          />
        ),
      },
      {
        path: "/laboratory/game",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/laboratory/game/index"))}
          />
        ),
      },
      {
        path: "/laboratory/video",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/laboratory/video/index"))}
          />
        ),
      },
      {
        path: "/laboratory/video-client",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/laboratory/video/client"))}
          />
        ),
      },
      {
        path: "/laboratory/picture",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/laboratory/picture"))}
          />
        ),
      },
      {
        path: "/laboratory/basepage",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/laboratory/basepage/index"))}
          />
        ),
      },
    ],
  },
];
