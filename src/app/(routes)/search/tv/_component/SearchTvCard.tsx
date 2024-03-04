import React from "react";
import styles from "./searchTvCard.module.scss";
import { SearchTvInfo } from "@/model/Movie";
import Link from "next/link";
import Image from "next/image";
import { FormatMDY } from "@/app/_utils/dayFormat";
import { POSTER_BASE_URL } from "@/app/_constants/constants";
import dynamic from "next/dynamic";

const RateCanvas = dynamic(() => import("@/canvas/RateCanvas"), {
  ssr: false,
});

type Props = {
  movie: SearchTvInfo;
};

const SearchTvCard = ({ movie }: Props) => {
  return (
    <Link href={`/tv/${movie.id}`} className={`${styles.card}`}>
      <div className={styles.imgWrapper}>
        <Image
          src={
            movie.poster_path === null
              ? "/no-image.svg"
              : POSTER_BASE_URL + movie.poster_path
          }
          width={150}
          height={225}
          alt="poster"
          loading="lazy"
        />
        <div className={styles.canvasWrapper}>
          <RateCanvas vote_average={movie.vote_average} size={40} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{movie.name}</div>
        <div className={styles.date}>
          {movie.first_air_date && FormatMDY(movie.first_air_date)}
        </div>
      </div>
    </Link>
  );
};

export default SearchTvCard;
