"use client";

import React from "react";
import styles from "./btnApply.module.scss";

const BtnApplyFilter = () => {
  const onApplyFilter = () => {};

  return (
    <div
      className={`${styles.btnWrapper} ${styles.active}`}
      onClick={onApplyFilter}
    >
      <button disabled={true}>Search</button>
    </div>
  );
};

export default BtnApplyFilter;
