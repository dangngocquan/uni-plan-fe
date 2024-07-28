import classNames from "classnames";

import styles from "./index.module.scss";
import AdminLayout from "../../layouts/AdminLayout";

const AdminHome = () => {
  return (
    <div className={classNames(styles.wrapper)}>
      <AdminLayout>{"a"}</AdminLayout>
    </div>
  );
};

export default AdminHome;
