import useMenuStore from "@/store/useMenuStore";
import type { BreadcrumbItem, RouteMenuItem } from "@/types/global";

function useBreadcrumb() {
  const { activeKey } = useMenuStore();

  /** 展开菜单节点 */
  const getOpenItems = (items: RouteMenuItem[]) => {
    let breadcrumbs: BreadcrumbItem[] = [];
    if (!items || items.length === 0) return breadcrumbs;

    for (const item of items) {
      if (item.path === activeKey) {
        breadcrumbs.push({
          key: item.key,
          label: item.label,
          title: item.title,
          icon: item.icon,
          path: item.path,
        });
        break;
      }

      if (item.children && item.children.length > 0) {
        const keys = getOpenItems(item.children);
        if (keys.length > 0) {
          keys.unshift({
            key: item.key,
            label: item.label,
            title: item.title,
            icon: item.icon,
            path: item.path,
          });
          breadcrumbs = breadcrumbs.concat(keys);
        }
      }
    }

    return breadcrumbs;
  };

  return { getOpenItems };
}

export default useBreadcrumb;
