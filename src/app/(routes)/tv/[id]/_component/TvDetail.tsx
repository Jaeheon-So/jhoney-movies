"use client";

import FadeInOut from "@/app/_components/FadeInOut";
import { getTvCredit } from "@/app/_lib/getTvCredit";
import { getTvDetail } from "@/app/_lib/getTvDetail";
import { getTvTrailers } from "@/app/_lib/getTvTrailers";
import { TvCast, TvTrailerResponse } from "@/model/Movie";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./tvDetail.module.scss";
import {
  POSTER_BASE_URL,
  POSTER_BASE_URL_w1920_H_427,
} from "@/app/_constants/constants";
import { FormatMDY } from "@/app/_utils/dayFormat";
import { IoMdHeart } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import CreditCard from "./CreditCard";
import SeasonCard from "./SeasonCard";

const RateCanvas = dynamic(() => import("@/canvas/RateCanvas"), {
  ssr: false,
});

type Props = {
  id: string;
};

const TvDetail = ({ id }: Props) => {
  const { data: tvDetail } = useQuery({
    queryKey: ["movies", "detail", "tv", id],
    queryFn: getTvDetail,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
  });
  const { data: trailerData } = useQuery<TvTrailerResponse>({
    queryKey: ["movies", "trailers", "tv", id],
    queryFn: () => getTvTrailers(Number(id)),
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
  });
  const { data: creditData, isLoading } = useQuery({
    queryKey: ["movies", "credits", "tv", id],
    queryFn: getTvCredit,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
  });

  const index = trailerData?.results?.findIndex((t) => t.type === "Trailer");

  const changeMToHM = (min: number | undefined) => {
    if (min === undefined) return "";
    return `${Math.floor(min / 60)}h ${min % 60}m`;
  };

  return (
    <>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${
            POSTER_BASE_URL_w1920_H_427 + tvDetail?.backdrop_path
          })`,
        }}
      >
        <div className={styles.infoWrapper}>
          <div className={styles.info}>
            <div className={styles.imageWrapper}>
              <Image
                src={
                  tvDetail?.poster_path === null
                    ? "/no-image.svg"
                    : POSTER_BASE_URL + tvDetail?.poster_path
                }
                width={300}
                height={450}
                loading="lazy"
                alt="poster"
              />
            </div>
            <div className={styles.left}>
              <div className={styles.titleWrapper}>
                <div className={styles.title}>{tvDetail?.name}</div>
                <div className={styles.rest}>
                  <div className={styles.date}>
                    {tvDetail?.first_air_date &&
                      FormatMDY(tvDetail.first_air_date)}
                  </div>
                  <div className={styles.genre}>
                    {tvDetail?.genres.map((genre) => genre.name).join(", ")}
                  </div>
                  <div className={styles.time}>
                    {tvDetail?.episode_run_time &&
                    tvDetail?.episode_run_time.length > 0
                      ? changeMToHM(tvDetail?.episode_run_time[0])
                      : null}
                  </div>
                </div>
              </div>
              <div className={styles.actions}>
                <div>
                  <RateCanvas
                    vote_average={tvDetail?.vote_average || 0}
                    size={60}
                  />
                </div>
                <div className={`${styles.svgWrapper} ${styles.active}`}>
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
              <div className={styles.tagline}>{tvDetail?.tagline}</div>
              <div className={styles.overviewWrapper}>
                <div className={styles.oTitle}>줄거리</div>
                <div className={styles.overview}>{tvDetail?.overview}</div>
              </div>
              <div className={styles.directorWrapper}>
                <div className={styles.dTitle}>제작</div>
                <div className={styles.creators}>
                  {tvDetail?.created_by.map((people, index) => (
                    <Link
                      href={`/people/${people?.id}-${people?.name
                        .split(" ")
                        .join("-")}`}
                      className={styles.director}
                      key={index}
                    >
                      {people?.name}
                    </Link>
                  ))}
                </div>
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
          {creditData?.cast.slice(0, 21).map((cast: TvCast, index: number) => (
            <CreditCard key={index} cast={cast} />
          ))}
        </FadeInOut>
      </section>
      <section className={styles.section2}>
        <div className={styles.title}>
          <h2>시즌</h2>
        </div>
        <div className={styles.seasonWrapper}>
          {tvDetail?.seasons.map((season, index) => (
            <SeasonCard season={season} key={index} />
          ))}
        </div>
      </section>
    </>
  );
};

export default TvDetail;
