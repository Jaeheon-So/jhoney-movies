"use client";

import { logout } from "../_lib/logout";
import styles from "./logoutButton.module.scss";

const LogoutButton = () => {
  const onLogout = async () => {
    await logout();
  };

  return (
    <a className={styles.logout} onClick={onLogout}>
      Logout
    </a>
  );
};

export default LogoutButton;
