"use client";

import React from "react";
import styles from "./movieDetail.module.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "@/app/_lib/getMovieDetail";
import Image from "next/image";
import {
  POSTER_BASE_URL,
  POSTER_BASE_URL_w1920_H_427,
} from "@/app/_constants/constants";
import { FormatMDY } from "@/app/_utils/dayFormat";
import { IoMdHeart } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { getMovieTrailers } from "@/app/_lib/getMovieTrailers";
import { MovieCast, MovieTrailerResponse } from "@/model/Movie";
import Link from "next/link";
import { getMovieCredit } from "@/app/_lib/getMovieCredit";
import dynamic from "next/dynamic";
import FadeInOut from "@/app/_components/FadeInOut";
import CreditCard from "./CreditCard";
import { Session } from "next-auth";
import { getAllFavorList } from "@/app/_lib/getAllFavorList";

const RateCanvas = dynamic(() => import("@/canvas/RateCanvas"), {
  ssr: false,
});

type Props = {
  id: string;
  session: Session | null;
};

const MovieDetail = ({ id, session }: Props) => {
  const { data: movieDetail } = useQuery({
    queryKey: ["movies", "detail", "movie", id],
    queryFn: getMovieDetail,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
  });
  const { data: trailerData } = useQuery<MovieTrailerResponse>({
    queryKey: ["movies", "trailers", "movie", id],
    queryFn: () => getMovieTrailers(Number(id)),
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
  });
  const { data: creditData, isLoading } = useQuery({
    queryKey: ["movies", "credits", "movie", id],
    queryFn: getMovieCredit,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
  });
  const { data: favorData } = useQuery({
    queryKey: ["auth", "favor", session?.user?.id || ""],
    queryFn: getAllFavorList,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
    enabled: !!session?.user,
  });

  const director = creditData?.crew.find((c) => c.job === "Director");
  const index = trailerData?.results?.findIndex((t) => t.type === "Trailer");
  const isFavor = favorData?.find((f) => f.id === Number(id));

  const changeMToHM = (min: number | undefined) => {
    if (min === undefined) return "";
    return `${Math.floor(min / 60)}h ${min % 60}m`;
  };

  const addFavor = useMutation({});
  const removeFavor = useMutation({});

  const toggleFavor = () => {
    if (isFavor) addFavor.mutate;
    else removeFavor.mutate();
  };

  return (
    <>
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
                    ? "/no-image.svg"
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
                    {movieDetail?.release_date &&
                      FormatMDY(movieDetail.release_date)}
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
                <div
                  className={`${styles.svgWrapper} ${isFavor && styles.active}`}
                  onClick={toggleFavor}
                >
                  <IoMdHeart />
                </div>
                {index && index >= 0 ? (
                  <Link
                    href={`/play?k=${trailerData?.results[index]?.key}`}
                    className={styles.trailer}
                  >
                    <div className={styles.svgWrapper2}>
                      <FaPlay />
                    </div>
                    <div>play Trailer</div>
                  </Link>
                ) : null}
              </div>
              <div className={styles.tagline}>{movieDetail?.tagline}</div>
              <div className={styles.overviewWrapper}>
                <div className={styles.oTitle}>줄거리</div>
                <div className={styles.overview}>{movieDetail?.overview}</div>
              </div>
              <div className={styles.directorWrapper}>
                <div className={styles.dTitle}>감독</div>
                <Link
                  href={`/people/${director?.id}-${director?.original_name
                    .split(" ")
                    .join("-")}`}
                  className={styles.director}
                >
                  {director?.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className={styles.section}>
        <div className={styles.title}>
          <h2>출연진</h2>
        </div>
        <FadeInOut isLoading={isLoading}>
          {creditData?.cast
            .slice(0, 21)
            .map((cast: MovieCast, index: number) => (
              <CreditCard key={index} cast={cast} />
            ))}
        </FadeInOut>
      </section>
    </>
  );
};

export default MovieDetail;
