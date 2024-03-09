import React from "react";
import styles from "./trailerCard.module.scss";
import { MovieInfo, MovieTrailerResponse, TvInfo } from "@/model/Movie";
import Link from "next/link";
import Image from "next/image";
import { POSTER_BASE_URL_w710_H_400 } from "../../constants/constants";
import { FaPlay } from "react-icons/fa";

type Props = {
  movie: MovieInfo | TvInfo;
  trailer: MovieTrailerResponse;
  onChangeImage: (image: string) => void;
};

const TrailerCard = ({ movie, trailer, onChangeImage }: Props) => {
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
        onMouseEnter={() => onChangeImage(movie.backdrop_path)}
      >
        <div className={styles.imgWrapper}>
          <Image
            src={
              movie.backdrop_path === null
                ? "/no-image.svg"
                : POSTER_BASE_URL_w710_H_400 + movie.backdrop_path
            }
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
          <div className={styles.title}>
            {"title" in movie ? movie.title : movie.name}
          </div>
          <div className={styles.trailerName}>
            {trailer?.results[index]?.name || ""}
          </div>
        </div>
      </Link>
    </>
  );
};

export default TrailerCard;
