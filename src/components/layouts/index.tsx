import { type FC } from "react";

import DefaultLayout from "./components/default";

const layoutComponents: Record<LayoutType, FC> = {
  default: DefaultLayout,
};

function Layouts() {
  const layoutType = "default";

  const Layout = layoutComponents[layoutType];
  return <Layout />;
}

export default Layouts;
