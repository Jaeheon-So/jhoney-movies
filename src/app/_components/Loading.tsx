import React from "react";
import styles from "./loading.module.scss";

const Loading = () => {
  const data = Array(20).fill(0);
  return (
    <>
      {data.map((v, index) => (
        <div key={index} className={styles.loading}>
          <div className={styles.imgWrapper}></div>
        </div>
      ))}
    </>
  );
};

export default Loading;
