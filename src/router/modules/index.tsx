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

export default asyncRoutes;
