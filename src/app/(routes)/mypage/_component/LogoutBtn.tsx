"use client";

import { logout } from "@/lib/logout";
import styles from "../layout.module.scss";

const LogoutBtn = () => {
  const onLogout = async () => {
    await logout();
  };

  return (
    <div className={styles.withdraw} onClick={onLogout}>
      로그아웃
    </div>
  );
};

export default LogoutBtn;
