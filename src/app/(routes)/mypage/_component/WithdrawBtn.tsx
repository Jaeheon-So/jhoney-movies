"use client";

import { Session } from "next-auth";
import React from "react";
import styles from "../layout.module.scss";
import { withdraw } from "@/app/_lib/withdraw";
import { logout } from "@/app/_lib/logout";

type Props = {
  session: Session | null;
};

const WithdrawBtn = ({ session }: Props) => {
  const onWithDraw = async () => {
    if (confirm("정말로 탈퇴하시겠습니까?")) {
      try {
        await withdraw(session?.user?.id || "");
        alert("회원 탈퇴 성공");
        await logout();
      } catch (error) {
        alert("회원 탈퇴 실패");
      }
    }
  };

  return (
    <div className={styles.withdraw} onClick={onWithDraw}>
      회원 탈퇴
    </div>
  );
};

export default WithdrawBtn;
