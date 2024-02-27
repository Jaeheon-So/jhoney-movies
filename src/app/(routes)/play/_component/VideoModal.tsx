"use client";

import React, { useRef, useState } from "react";
import styles from "./videoModal.module.scss";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

type Props = {
  searchParams: { k: string };
};

const VideoModal = ({ searchParams }: Props) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [fadeStatus, setFadeStatus] = useState("in");

  const modalOutSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      onClickClose();
    }
  };

  const onClickClose = () => {
    setFadeStatus("out");
    setTimeout(() => router.back(), 500);
  };

  return (
    <div
      className={`${styles.overlay} ${
        fadeStatus === "in" ? styles.fadein : styles.fadeout
      }`}
      ref={modalRef}
      onClick={modalOutSideClick}
    >
      <div className={styles.container}>
        <div className={styles.blackSection}>
          <div className={styles.closeWrapper}>
            <IoClose onClick={onClickClose} />
          </div>
        </div>
        <div className={styles.videoWrapper}>
          <iframe
            src={`https://www.youtube.com/embed/${searchParams.k}?controls=1&loop=1&mute=0&playlist=${searchParams.k}`}
            frameBorder="0"
            allow="autoplay; fullscreen"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
