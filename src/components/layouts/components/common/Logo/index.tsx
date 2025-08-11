import { PUBLIC_PATH, APP_TITLE } from "@/utils/constants";

import styles from "./index.module.css";

import useGoto from "@/hooks/useGoto";

type AppLogoProps = {
  animate?: boolean;
  className?: string;
  title?: string;
  showTitle?: boolean;
  style?: React.CSSProperties;
};
const AppLogo = ({ showTitle, style, title = APP_TITLE }: AppLogoProps) => {
  const { goHome } = useGoto();
  return (
    <div className={styles["logo"]} style={style} onClick={() => goHome()}>
      <img
        width={style?.fontSize ? style?.fontSize : 24}
        height={style?.fontSize ? style?.fontSize : 24}
        src={`${PUBLIC_PATH}/logo.svg`}
        alt="logo"
      />
      {showTitle ? <h2 className="ellipsis">{title}</h2> : ""}
    </div>
  );
};

export default AppLogo;
