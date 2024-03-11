import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import styles from "./not-found.module.scss";

const NotFound: NextPage = () => {
  return (
    <div className={styles.container}>
      <div>존재하지 않는 페이지입니다.</div>
      <Link href="/">홈으로 돌아가기</Link>
    </div>
  );
};

export default NotFound;
