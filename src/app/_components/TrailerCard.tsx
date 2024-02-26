"use client";

import React, { useEffect, useState } from "react";
import styles from "./trailerCard.module.scss";
import { PopularMovieInfo, PopularMovieTrailerResponse } from "@/model/Movie";
import Link from "next/link";
import Image from "next/image";
import { POSTER_BASE_URL_w710_H_400 } from "../_constants/constants";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Props = {
  movie: PopularMovieInfo;
  trailer: PopularMovieTrailerResponse;
};

const TrailerCard = ({ movie, trailer }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(window.location.hash);

  const onClose = () => {
    setIsOpen("");
    router.back();
  };

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  if (trailer?.results?.length === 0) return null;

  return (
    <>
      <Link
        href={`/#play=${trailer?.results[0]?.key}`}
        className={styles.card}
        scroll={false}
        onClick={() => setIsOpen(`#play=${trailer?.results[0]?.key}`)}
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
            {trailer?.results[0]?.name || ""}
          </div>
        </div>
      </Link>
      {isOpen === `#play=${trailer?.results[0]?.key}` && (
        <div id={`play=${trailer?.results[0]?.key}`} onClick={onClose}>
          <iframe
            src={`https://www.youtube.com/embed/${trailer?.results[0]?.key}?controls=0&loop=1&mute=1&playlist=${trailer?.results[0]?.key}`}
            frameBorder="0"
            allow="autoplay; fullscreen"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default TrailerCard;
