"use client";

import { Session } from "next-auth";
import React from "react";
import styles from "../layout.module.scss";
import { withdraw } from "@/lib/auth/withdraw";
import { logout } from "@/lib/auth/logout";
import { notify } from "@/app/_components/Toast";
import { useModalStore } from "@/store/confirmModal";

type Props = {
  session: Session | null;
};

const WithdrawBtn = ({ session }: Props) => {
  const { openModal, closeModal } = useModalStore();

  const onWithDraw = async () => {
    openModal({
      title: "회원 탈퇴",
      content: <div>정말로 탈퇴하시겠습니까?</div>,
      confirmCallback: async () => {
        try {
          await withdraw(session?.user?.id || "");
          closeModal();
          await logout();
        } catch (error) {
          notify({
            type: "error",
            content: "회원 탈퇴 중 오류가 발생했습니다.",
          });
        }
      },
    });
  };

  return (
    <div className={styles.withdraw} onClick={onWithDraw}>
      회원 탈퇴
    </div>
  );
};

export default WithdrawBtn;
