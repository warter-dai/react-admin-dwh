import { Spin, type SpinProps } from "antd";

const AppLoading = (props: SpinProps = { size: "default" }) => {
  return <Spin {...props}></Spin>;
};

export default AppLoading;
