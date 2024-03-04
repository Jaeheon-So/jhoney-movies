import React from "react";
import styles from "./searchMovieCard.module.scss";
import { SearchMovieInfo } from "@/model/Movie";
import Link from "next/link";
import Image from "next/image";
import { FormatMDY } from "@/app/_utils/dayFormat";
import { POSTER_BASE_URL } from "@/app/_constants/constants";
import dynamic from "next/dynamic";

const RateCanvas = dynamic(() => import("@/canvas/RateCanvas"), {
  ssr: false,
});

type Props = {
  movie: SearchMovieInfo;
};

const SearchMovieCard = ({ movie }: Props) => {
  return (
    <Link href={`/movie/${movie.id}`} className={`${styles.card}`}>
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
        <div className={styles.title}>{movie.title}</div>
        <div className={styles.date}>
          {movie.release_date && FormatMDY(movie.release_date)}
        </div>
      </div>
    </Link>
  );
};

export default SearchMovieCard;
