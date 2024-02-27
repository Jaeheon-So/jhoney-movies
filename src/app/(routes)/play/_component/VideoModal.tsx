"use client";

import React, { useRef } from "react";
import styles from "./videoModal.module.scss";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

type Props = {
  searchParams: { k: string };
};

const VideoModal = ({ searchParams }: Props) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const modalOutSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      router.back();
    }
  };

  const onClickClose = () => {
    router.back();
  };

  return (
    <div className={styles.overlay} ref={modalRef} onClick={modalOutSideClick}>
      <div className={styles.container}>
        <div className={styles.blackSection}>
          <div className={styles.closeWrapper} onClick={onClickClose}>
            <IoClose />
          </div>
        </div>
        <div className={styles.videoWrapper}>
          <iframe
            src={`https://www.youtube.com/embed/${searchParams.k}?controls=0&loop=1&mute=1&playlist=${searchParams.k}`}
            frameBorder="0"
            allow="autoplay; fullscreen"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
