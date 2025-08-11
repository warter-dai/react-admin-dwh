import { createBrowserRouter } from "react-router-dom";

import routes from "./modules/index";

const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_PUBLIC_PATH,
});

export default router;
