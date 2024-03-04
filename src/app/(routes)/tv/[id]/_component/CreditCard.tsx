import React from "react";
import styles from "./creditCard.module.scss";
import { TvCast } from "@/model/Movie";
import Image from "next/image";
import Link from "next/link";
import { POSTER_BASE_URL } from "@/app/_constants/constants";

type Props = {
  cast: TvCast;
};

const CreditCard = ({ cast }: Props) => {
  return (
    <Link
      href={`/people/${cast.id}-${cast.original_name.split(" ").join("-")}`}
      className={`${styles.card}`}
    >
      <div className={styles.imgWrapper}>
        <Image
          src={
            cast.profile_path === null
              ? "/no-image.svg"
              : POSTER_BASE_URL + cast.profile_path
          }
          width={150}
          height={225}
          alt="poster"
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{cast.name}</div>
        <div className={styles.known}>{cast.roles[0]?.character || ""}</div>
        <div
          className={styles.count}
        >{`${cast.total_episode_count} Episodes`}</div>
      </div>
    </Link>
  );
};

export default CreditCard;
