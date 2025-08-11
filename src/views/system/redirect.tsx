import useGoto from "@/hooks/useGoto";
// import { HOME_PATH } from "@/utils/constants";
import { Fragment, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

const Redirect = () => {
  const { go } = useGoto();
  const { path } = useParams();
  // debugger;
  useEffect(() => {
    if (!path) return;
    go("/" + path, { replace: true });
  }, [path]);
  return (
    <Fragment>
      <Outlet></Outlet>
    </Fragment>
  );
};

export default Redirect;
