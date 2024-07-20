import React from "react";
import Header from "../Header";
import classNames from "classnames";

import styles from "./index.module.scss";
import Footer from "../Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header></Header>
      <div className={classNames(styles.children)}>{children}</div>
      <Footer></Footer>
    </div>
  );
}
