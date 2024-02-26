import React from "react";
import styles from "./loading.module.scss";

type Props = {
  isTrailer: boolean;
};

const Loading = ({ isTrailer }: Props) => {
  const data = Array(20).fill(0);

  return (
    <>
      {data.map((v, index) => (
        <div key={index} className={`${styles.loading}`}>
          <div
            className={`${styles.imgWrapper} ${
              isTrailer ? styles.trailer : ""
            }`}
          ></div>
        </div>
      ))}
    </>
  );
};

export default Loading;
