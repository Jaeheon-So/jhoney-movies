"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import React, { ReactNode } from "react";
import styles from "../layout.module.scss";

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => {
  const pathArray = useSelectedLayoutSegments();

  return (
    <div
      className={`${styles.container} ${
        pathArray.length > 0 &&
        !pathArray.includes("top-rated") &&
        styles.detail
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
