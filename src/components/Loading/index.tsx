import classNames from "classnames";
import styles from "./index.module.scss";
import React from "react";

const Loading = () => {
  return <div className={classNames(styles.wrapper)}>
    <div className={classNames(styles.loader)}></div>
  </div>;
};

export default Loading;