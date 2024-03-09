"use client";

import React from "react";
import { useModalStore } from "../_store/confirmModal";
import styles from "./confirmModal.module.scss";

type Props = {};

const ConfirmModal = ({}: Props) => {
  const {
    isModalOpen,
    title,
    content,
    confirmCallback,
    cancelCallback,
    closeModal,
  } = useModalStore();

  if (isModalOpen)
    return (
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div className={styles.title}>{title}</div>
          <div className={styles.content}>{content}</div>
          <div className={styles.select}>
            <button onClick={confirmCallback}>확인</button>
            <button onClick={cancelCallback || closeModal}>취소</button>
          </div>
        </div>
      </div>
    );
  else return null;
};

export default ConfirmModal;
