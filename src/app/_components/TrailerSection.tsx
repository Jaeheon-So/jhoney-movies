"use client";

import React, { useState } from "react";
import styles from "./trailerSection.module.scss";
import { useQueries, useQuery } from "@tanstack/react-query";
import FadeInOut from "./FadeInOut";
import {
  MovieInfo,
  MovieTrailerResponse,
  TvInfo,
  TvTrailerResponse,
} from "@/model/Movie";
import { getPopularMovies } from "../_lib/getPopularMovies";
import { getMovieTrailers } from "../_lib/getMovieTrailers";
import TrailerCard from "./TrailerCard";
import { getUpComingMovie } from "../_lib/getUpcomingMovie";
import { getNowPlayingMovie } from "../_lib/getNowPlayingMovie";
import { getOnAirTv } from "../_lib/getOnAirTv";
import { getTvTrailers } from "../_lib/getTvTrailers";

const TrailerSection = () => {
  const [type, setType] = useState<
    "popular" | "upcoming" | "now_play" | "ontv"
  >("popular");
  const { data: popularData, isLoading: isPopularLoading } = useQuery({
    queryKey: ["movies", "popular", "movie"],
    queryFn: getPopularMovies,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
    enabled: type === "popular",
  });
  const { data: upComingData, isLoading: isUpComingLoading } = useQuery({
    queryKey: ["movies", "upcoming", "movie"],
    queryFn: getUpComingMovie,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
    enabled: type === "upcoming",
  });
  const { data: nowPlayData, isLoading: isNowPlayLoading } = useQuery({
    queryKey: ["movies", "nowplay", "movie"],
    queryFn: getNowPlayingMovie,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
    enabled: type === "now_play",
  });
  const { data: onTvData, isLoading: isOnTvLoading } = useQuery({
    queryKey: ["movies", "onAir", "tv"],
    queryFn: getOnAirTv,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
    enabled: type === "ontv",
  });

  const checkQuries = () => {
    switch (type) {
      case "popular":
        return popularData
          ? popularData.results.map((movie) => ({
              queryKey: ["movies", "trailers", "movie", movie.id],
              queryFn: () => getMovieTrailers(movie.id),
              staleTime: 60 * 1000 * 5,
              gcTime: 60 * 1000 * 5,
            }))
          : [];
      case "upcoming":
        return upComingData
          ? upComingData.results.map((movie) => ({
              queryKey: ["movies", "trailers", "movie", movie.id],
              queryFn: () => getMovieTrailers(movie.id),
              staleTime: 60 * 1000 * 5,
              gcTime: 60 * 1000 * 5,
            }))
          : [];
      case "now_play":
        return nowPlayData
          ? nowPlayData.results.map((movie) => ({
              queryKey: ["movies", "trailers", "movie", movie.id],
              queryFn: () => getMovieTrailers(movie.id),
              staleTime: 60 * 1000 * 5,
              gcTime: 60 * 1000 * 5,
            }))
          : [];
      case "ontv":
        return onTvData
          ? onTvData.results.map((movie) => ({
              queryKey: ["movies", "trailers", "tv", movie.id],
              queryFn: () => getTvTrailers(movie.id),
              staleTime: 60 * 1000 * 5,
              gcTime: 60 * 1000 * 5,
            }))
          : [];
    }
  };

  const trailerData: {
    data: MovieTrailerResponse[] | TvTrailerResponse[];
    pending: boolean;
  } = useQueries({
    queries: checkQuries(),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  const checkClassName = (type: string) => {
    switch (type) {
      case "popular":
        return styles.left;
      case "upcoming":
        return styles.left25;
      case "now_play":
        return styles.left50;
      case "ontv":
        return styles.right;
    }
  };

  const checkIsLoading = (type: string) => {
    switch (type) {
      case "popular":
        return isPopularLoading;
      case "upcoming":
        return isUpComingLoading;
      case "now_play":
        return isNowPlayLoading;
      case "ontv":
        return isOnTvLoading;
      default:
        return true;
    }
  };

  const checkData = (type: string) => {
    switch (type) {
      case "popular":
        return popularData;
      case "upcoming":
        return upComingData;
      case "now_play":
        return nowPlayData;
      case "ontv":
        return onTvData;
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h2>Trailers</h2>
          <div className={styles.selectWrapper}>
            <div className={styles.select}>
              <div
                className={`${styles.choice} ${
                  type === "popular" ? styles.active : ""
                }`}
                onClick={() => setType("popular")}
              >
                <h3>Popular</h3>
              </div>
              <div
                className={`${styles.choice} ${
                  type === "upcoming" ? styles.active : ""
                }`}
                onClick={() => setType("upcoming")}
              >
                <h3>Up Coming</h3>
              </div>
              <div
                className={`${styles.choice} ${
                  type === "now_play" ? styles.active : ""
                }`}
                onClick={() => setType("now_play")}
              >
                <h3>Now Playing</h3>
              </div>
              <div
                className={`${styles.choice} ${
                  type === "ontv" ? styles.active : ""
                }`}
                onClick={() => setType("ontv")}
              >
                <h3>On TV</h3>
              </div>
              <div className={`${styles.move} ${checkClassName(type)}`}></div>
            </div>
          </div>
        </div>
        <FadeInOut isLoading={checkIsLoading(type)} isTrailer={true}>
          {checkData(type)?.results.map(
            (movie: MovieInfo | TvInfo, index: number) =>
              trailerData.data[index]?.results?.length > 0 ? (
                <TrailerCard
                  key={index}
                  movie={movie}
                  trailer={trailerData.data[index]}
                />
              ) : null
          )}
        </FadeInOut>
      </div>
    </section>
  );
};

export default TrailerSection;
