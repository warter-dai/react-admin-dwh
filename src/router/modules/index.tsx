import LazyLoadComponent from "../LazyLoadComponent";
import { lazy } from "react";
import AuthLayout from "@/components/layouts/components/AuthLayout";
import RedirectRoute from "../RedirectRoute";

function initRoutes() {
  const routes: IRouteObject[] = [];

  // * 导入所有route
  const metaRoutes: Record<
    string,
    Record<string, IRouteObject[]>
  > = import.meta.glob("../modules/*.tsx", {
    eager: true,
  });
  Object.keys(metaRoutes).forEach((item) => {
    Object.keys(metaRoutes[item]).forEach((key) => {
      routes.push(...metaRoutes[item][key]);
    });
  });
  // 根据order排序，升序排列，值越小越在前面
  routes.sort((a, b) => (a.meta?.order || 0) - (b.meta?.order || 0));
  return routes;
}

const asyncRoutes = initRoutes();

export const constantRouterMap: IRouteObject[] = [
  {
    path: "/redirect",
    element: <AuthLayout />,
    meta: {
      menu: false,
    },
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
    path: "/",
    element: <AuthLayout />,

    meta: {},
    children: [
      {
        index: true,
        element: <RedirectRoute to="/basepage"></RedirectRoute>,
      },
      {
        path: "/about",
        element: (
          <LazyLoadComponent Component={lazy(() => import("@/views/about"))} />
        ),
        meta: {
          title: "about",
        },
      },
      {
        path: "/workspace",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/workspace"))}
          />
        ),
        meta: {
          title: "workspace",
        },
      },
      {
        path: "/basepage",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/basepage"))}
          />
        ),
        meta: {
          title: "basepage",
        },
      },
      {
        path: "/listpage",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/listpage"))}
          />
        ),
        meta: {
          title: "listpage",
        },
      },
      {
        path: "/page1",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/page/page1"))}
          />
        ),
        meta: {
          title: "page1",
        },
      },
      {
        path: "/page2",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/page/page2"))}
          />
        ),
        meta: {
          title: "page2",
        },
      },
      {
        path: "/page3",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/page/page3"))}
          />
        ),
        meta: {
          title: "page3",
        },
      },
      {
        path: "/page4",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/page/page4"))}
          />
        ),
        meta: {
          title: "page4",
        },
      },
      {
        path: "/page5",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/page/page5"))}
          />
        ),
        meta: {
          title: "page5",
        },
      },
      {
        path: "/page6",
        element: (
          <LazyLoadComponent
            Component={lazy(() => import("@/views/page/page6"))}
          />
        ),
        meta: {
          title: "page6",
        },
      },
    ],
  },
  {
    path: "/login",
    meta: {
      title: "login",
      auth: true,
      menu: true,
      hidden: false,
      openMode: "router",
      order: 18,
      icon: "carbon:information",
    },
    element: (
      <LazyLoadComponent Component={lazy(() => import("@/views/login"))} />
    ),
  },
];

const routes = constantRouterMap.concat(asyncRoutes);

export default routes;
