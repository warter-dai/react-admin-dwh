import { createBrowserRouter } from "react-router-dom";

import routes from "./modules/index";
import { constantRouter } from "./constantRouter";

const router = createBrowserRouter(constantRouter.concat(routes), {
  basename: import.meta.env.VITE_PUBLIC_PATH,
});

export default router;
