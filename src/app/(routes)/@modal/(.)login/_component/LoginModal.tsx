"use client";

import React, { ReactNode, useRef } from "react";
import styles from "../page.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

type Props = {
  children: ReactNode;
};

const LoginModal = ({ children }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const modalOutSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      onClickClose();
    }
  };

  const onClickClose = () => {
    router.back();
  };

  if (pathname !== "/login") {
    return null;
  }

  return (
    <div className={styles.overlay} ref={modalRef} onClick={modalOutSideClick}>
      <div className={styles.wrapper}>
        <div className={styles.svgWrapper}>
          <IoClose onClick={onClickClose} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default LoginModal;
