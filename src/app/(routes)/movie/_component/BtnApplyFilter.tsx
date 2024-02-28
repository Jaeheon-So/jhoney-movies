"use client";

import React from "react";
import styles from "./btnApply.module.scss";
import { useRouter } from "next/navigation";

const BtnApplyFilter = () => {
  const router = useRouter();
  const onApplyFilter = () => {
    router.push("/movie/123");
  };

  return (
    <div
      className={`${styles.btnWrapper} ${styles.active}`}
      onClick={onApplyFilter}
    >
      <button>Search</button>
    </div>
  );
};

export default BtnApplyFilter;
