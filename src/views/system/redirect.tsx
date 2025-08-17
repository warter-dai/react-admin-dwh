import useGoto from "@/hooks/useGoto";
// import { HOME_PATH } from "@/utils/constants";
import { Fragment, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Redirect = () => {
  const { go } = useGoto();
  const { search } = useLocation();
  // const params = useParams();
  // debugger;
  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const path = searchParams.get("path");
    if (!path) return;
    go("/" + path, { replace: true });
  }, [search]);
  return (
    <Fragment>
      <Outlet></Outlet>
    </Fragment>
  );
};

export default Redirect;
