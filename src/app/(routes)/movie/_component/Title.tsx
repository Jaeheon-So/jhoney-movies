"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import React from "react";
import styles from "../layout.module.scss";

const Title = () => {
  const pathArray = useSelectedLayoutSegments();

  if (pathArray.length > 0 && !pathArray.includes("top-rated")) return null;

  return (
    <div className={styles.title}>
      {pathArray.includes("top-rated") ? "Top Rated" : "Popular"}
    </div>
  );
};

export default Title;
