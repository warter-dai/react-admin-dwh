import styles from "./index.module.css";
import { APP_FOOTER_CONTENT } from "@/utils/constants";

function Footer() {
  return (
    <div className={styles.footer}>
      ©{new Date().getFullYear()} {APP_FOOTER_CONTENT}
    </div>
  );
}

export default Footer;
