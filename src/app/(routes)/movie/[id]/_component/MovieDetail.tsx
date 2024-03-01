"use client";

import React from "react";
import styles from "./movieDetail.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "@/app/_lib/getMovieDetail";
import Image from "next/image";
import {
  POSTER_BASE_URL,
  POSTER_BASE_URL_w1920_H_427,
} from "@/app/_constants/constants";
import { FormatMDY } from "@/app/_utils/dayFormat";
import RateCanvas from "@/canvas/RateCanvas";
import { IoMdHeart } from "react-icons/io";
import { FaPlay } from "react-icons/fa";

type Props = {
  id: string;
};

const MovieDetail = ({ id }: Props) => {
  const { data: movieDetail } = useQuery({
    queryKey: ["movies", "detail", "movie", id],
    queryFn: getMovieDetail,
  });

  const changeMToHM = (min: number | undefined) => {
    if (min === undefined) return "";
    return `${Math.floor(min / 60)}h ${min % 60}m`;
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${
          POSTER_BASE_URL_w1920_H_427 + movieDetail?.backdrop_path
        })`,
      }}
    >
      <div className={styles.infoWrapper}>
        <div className={styles.info}>
          <div className={styles.imageWrapper}>
            <Image
              src={
                movieDetail?.poster_path === null
                  ? "no-image.svg"
                  : POSTER_BASE_URL + movieDetail?.poster_path
              }
              width={300}
              height={450}
              loading="lazy"
              alt="poster"
            />
          </div>
          <div className={styles.left}>
            <div className={styles.titleWrapper}>
              <div className={styles.title}>{movieDetail?.title}</div>
              <div className={styles.rest}>
                <div className={styles.date}>
                  {FormatMDY(movieDetail?.release_date || "")}
                </div>
                <div className={styles.genre}>
                  {movieDetail?.genres.map((genre) => genre.name).join(", ")}
                </div>
                <div className={styles.time}>
                  {changeMToHM(movieDetail?.runtime)}
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <div>
                <RateCanvas
                  vote_average={movieDetail?.vote_average || 0}
                  size={60}
                />
              </div>
              <div className={`${styles.svgWrapper} ${styles.active}`}>
                <IoMdHeart />
              </div>
              <div className={styles.trailer}>
                <div className={styles.svgWrapper2}>
                  <FaPlay />
                </div>
                <div>play Trailer</div>
              </div>
            </div>
            <div className={styles.tagline}>{movieDetail?.tagline}</div>
            <div className={styles.overviewWrapper}>
              <div className={styles.oTitle}>줄거리</div>
              <div className={styles.overview}>{movieDetail?.overview}</div>
            </div>
            <div className={styles.directorWrapper}>
              <div className={styles.dTitle}>감독</div>
              <div className={styles.director}>William Eubank</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
