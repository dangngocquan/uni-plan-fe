import classNames from "classnames";
import styles from "./index.module.scss";

const Footer = () => {
  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.textFooter)}>
      Copyright © 2023 by Biofolio. All Rights Reserved.
      </div>
      <div className={classNames(styles.actions)}>
        <div className={classNames(styles.action)}>
        Privacy Policy
        </div>
        <div className={classNames(styles.action)}>
        Terms of Services
        </div>
        <div className={classNames(styles.action)}>
        Contact Us
        </div>
      </div>
    </div>
  );
};

export default Footer;