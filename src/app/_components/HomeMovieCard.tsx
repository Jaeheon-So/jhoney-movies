"use client";

import React from "react";
import { POSTER_BASE_URL } from "../_constants/constants";
import styles from "./homeMovieCard.module.scss";
import Link from "next/link";
import Image from "next/image";
import styles2 from "./fadeInOut.module.scss";
import { FormatMDY } from "../_utils/dayFormat";
import dynamic from "next/dynamic";
import { PopularMovieInfo, PopularTvInfo, TrendMovieInfo } from "@/model/Movie";
// import defaultProfile from "/no_image.svg";

const RateCanvas = dynamic(() => import("@/canvas/RateCanvas"), {
  ssr: false,
});
type Props = {
  movie: TrendMovieInfo | PopularMovieInfo | PopularTvInfo;
  type: "trend" | "popularM" | "popularT";
};

const HomeMovieCard = ({ movie, type }: Props) => {
  if (type === "trend") {
    const newMovie = movie as TrendMovieInfo;
    return (
      <Link
        href={`/${newMovie.media_type}/${movie.id}`}
        className={`${styles.card} ${styles2.card}`}
      >
        <div className={styles.imgWrapper}>
          <Image
            src={
              movie.poster_path === "null"
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
          <div className={styles.title}>{newMovie.title}</div>
          <div className={styles.date}>{FormatMDY(newMovie.release_date)}</div>
        </div>
      </Link>
    );
  }

  if (type === "popularM") {
    const newMovie = movie as PopularMovieInfo;
    return (
      <Link
        href={`/movie/${movie.id}`}
        className={`${styles.card} ${styles2.card}`}
      >
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
          <div className={styles.title}>{newMovie.title}</div>
          <div className={styles.date}>{FormatMDY(newMovie.release_date)}</div>
        </div>
      </Link>
    );
  }

  if (type === "popularT") {
    const newMovie = movie as PopularTvInfo;
    return (
      <Link
        href={`/tv/${movie.id}`}
        className={`${styles.card} ${styles2.card}`}
      >
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
          <div className={styles.title}>{newMovie.name}</div>
          <div className={styles.date}>
            {FormatMDY(newMovie.first_air_date)}
          </div>
        </div>
      </Link>
    );
  }

  return null;
};

export default HomeMovieCard;
