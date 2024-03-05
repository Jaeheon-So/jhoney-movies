import React from "react";
import styles from "./noResult.module.scss";

type Props = {
  q: string;
};

const NoResult = ({ q }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.message}>
        {`"${q}"`}에 관련된 검색 결과가 없습니다.
      </div>
    </div>
  );
};

export default NoResult;
