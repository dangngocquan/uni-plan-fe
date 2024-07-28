import React from "react";
import AdminHeader from "./AdminHeader";
import classNames from "classnames";

import styles from "./index.module.scss";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={classNames(styles.wrapper)}>
      <AdminHeader></AdminHeader>
      <div className={classNames(styles.children)}>{children}</div>
    </div>
  );
}
