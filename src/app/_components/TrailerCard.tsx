import React from "react";
import styles from "./trailerCard.module.scss";
import { PopularMovieInfo, PopularMovieTrailerResponse } from "@/model/Movie";
import Link from "next/link";
import Image from "next/image";
import { POSTER_BASE_URL_w710_H_400 } from "../_constants/constants";
import { FaPlay } from "react-icons/fa";

type Props = {
  movie: PopularMovieInfo;
  trailer: PopularMovieTrailerResponse;
};

const TrailerCard = ({ movie, trailer }: Props) => {
  if (trailer?.results?.length === 0) return null;

  const index =
    trailer?.results?.findIndex((t) => t.type === "Trailer") >= 0
      ? trailer?.results?.findIndex((t) => t.type === "Trailer")
      : 0;

  return (
    <>
      <Link
        href={`/play?k=${trailer?.results[index]?.key}`}
        className={styles.card}
        scroll={false}
      >
        <div className={styles.imgWrapper}>
          <Image
            src={POSTER_BASE_URL_w710_H_400 + movie.backdrop_path}
            width={300}
            height={170}
            alt="poster"
            loading="lazy"
          />
          <div className={styles.play}>
            <FaPlay />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{movie.title}</div>
          <div className={styles.trailerName}>
            {trailer?.results[index]?.name || ""}
          </div>
        </div>
      </Link>
    </>
  );
};

export default TrailerCard;
