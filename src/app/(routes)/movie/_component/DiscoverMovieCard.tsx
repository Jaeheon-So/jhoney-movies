import { POSTER_BASE_URL } from "@/app/_constants/constants";
import { PopularMovieInfo } from "@/model/Movie";
import Image from "next/image";
import React from "react";
import styles from "./discoverMovieCard.module.scss";
import RateCanvas from "@/canvas/RateCanvas";
import Link from "next/link";
import { FormatMDY } from "@/app/_utils/dayFormat";

type Props = {
  movie: PopularMovieInfo;
};

const DiscoverMovieCard = ({ movie }: Props) => {
  return (
    <Link href={`/movie/${movie.id}`} className={`${styles.card}`}>
      <div className={styles.imgWrapper}>
        {/* <img src={POSTER_BASE_URL + movie.poster_path} /> */}
        <Image
          src={
            movie.poster_path === null
              ? "no-image.svg"
              : POSTER_BASE_URL + movie.poster_path
          }
          width={150}
          height={225}
          alt="poster"
          loading="lazy"
        />
        <RateCanvas movie={movie} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{movie.title}</div>
        <div className={styles.date}>{FormatMDY(movie.release_date)}</div>
      </div>
    </Link>
  );
};

export default DiscoverMovieCard;
