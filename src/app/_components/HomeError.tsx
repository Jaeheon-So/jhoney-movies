"use client";

import React from "react";
import styles from "./homeError.module.scss";

type Props = {
  message: string;
  refetch: () => void;
};

const HomeError = ({ message, refetch }: Props) => {
  return (
    <div className={styles.errorWrapper}>
      <div className={styles.message}>{message}</div>
      <div className={styles.retry} onClick={() => refetch()}>
        다시 시도
      </div>
    </div>
  );
};

export default HomeError;
