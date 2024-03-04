import { CreditCast } from "@/model/People";
import React from "react";
import styles from "./career.module.scss";
import Link from "next/link";

type Props = {
  year: string;
  info: CreditCast[];
};

const Career = ({ year, info }: Props) => {
  return (
    <div className={styles.container}>
      {info.map((i, idx) => (
        <div key={idx} className={styles.card}>
          <div>{year}</div>
          <div>{"-"}</div>
          <div className={styles.infoWrapper}>
            <Link href={`/${i.media_type}/${i.id}`} className={styles.title}>
              {i.original_title}
            </Link>
            <div className={styles.char}>as {i.character}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Career;
