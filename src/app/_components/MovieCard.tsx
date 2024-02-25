import React from "react";
import { POSTER_BASE_URL } from "../_constants/constants";
import styles from "./movieCard.module.scss";
import { IMovieInfo } from "@/model/movie";
import Link from "next/link";
import Image from "next/image";
import styles2 from "./fadeInOut.module.scss";

type Props = {
  movie: IMovieInfo;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <Link
      href={`/${movie.media_type}/${movie.id}`}
      className={`${styles.card} ${styles2.card}`}
    >
      <div className={styles.imgWrapper}>
        {/* <img src={POSTER_BASE_URL + movie.poster_path} /> */}
        <Image
          src={POSTER_BASE_URL + movie.poster_path}
          width={150}
          height={225}
          alt="poster"
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{movie.title}</div>
        <div className={styles.date}>{"Apr 05, 2015"}</div>
      </div>
    </Link>
  );
};

export default MovieCard;
