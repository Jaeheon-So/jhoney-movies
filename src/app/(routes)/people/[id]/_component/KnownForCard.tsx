import { PeopleKnownFor } from "@/model/People";
import React from "react";
import styles from "./knownForCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import { POSTER_BASE_URL } from "@/constants/constants";
import { FormatMDY } from "@/utils/dayFormat";
import dynamic from "next/dynamic";

const RateCanvas = dynamic(() => import("@/canvas/RateCanvas"), {
  ssr: false,
});

type Props = {
  known: PeopleKnownFor;
};

const KnownForCard = ({ known }: Props) => {
  return (
    <Link
      href={`/${known.media_type}/${known.id}`}
      className={`${styles.card}`}
    >
      <div className={styles.imgWrapper}>
        <Image
          src={
            known.poster_path === null
              ? "/no-image.svg"
              : POSTER_BASE_URL + known.poster_path
          }
          width={150}
          height={225}
          alt="poster"
          loading="lazy"
        />
        <div className={styles.canvasWrapper}>
          <RateCanvas vote_average={known.vote_average} size={40} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{known.name || known.title}</div>
      </div>
    </Link>
  );
};

export default KnownForCard;
