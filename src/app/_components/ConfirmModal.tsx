"use client";

import React, { useRef } from "react";

import styles from "./confirmModal.module.scss";
import { useModalStore } from "@/store/confirmModal";

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

  const modalRef = useRef<HTMLDivElement>(null);

  const modalOutSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      closeModal();
    }
  };

  if (isModalOpen)
    return (
      <div
        className={styles.overlay}
        ref={modalRef}
        onClick={modalOutSideClick}
      >
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
