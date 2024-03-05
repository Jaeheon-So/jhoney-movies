"use client";

import React, { useState } from "react";
import styles from "./popularSection.module.scss";
import { useQuery } from "@tanstack/react-query";
import FadeInOut from "./FadeInOut";
import HomeMovieCard from "./HomeMovieCard";
import { getPopularMovies } from "../_lib/getPopularMovies";
import { getPopularTv } from "../_lib/getPopularTv";
import { PopularMovieInfo, PopularTvInfo } from "@/model/Movie";
import HomeError from "./HomeError";

const PopluarSection = () => {
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");
  const {
    data: movieData,
    isLoading: isLoadingMovie,
    isError: isErrorMovie,
    refetch: refetchMovie,
  } = useQuery({
    queryKey: ["movies", "popular", "movie"],
    queryFn: getPopularMovies,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
    enabled: mediaType === "movie",
  });

  const {
    data: tvData,
    isLoading: isLoadingTv,
    isError: isErrorTv,
    refetch: refetchTv,
  } = useQuery({
    queryKey: ["movies", "popular", "tv"],
    queryFn: getPopularTv,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
    enabled: mediaType === "tv",
  });

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h2>Popular</h2>
        <div className={styles.selectWrapper}>
          <div className={styles.select}>
            <div
              className={`${styles.choice} ${
                mediaType === "movie" ? styles.active : ""
              }`}
              onClick={() => setMediaType("movie")}
            >
              <h3>영화</h3>
            </div>
            <div
              className={`${styles.choice} ${
                mediaType === "tv" ? styles.active : ""
              }`}
              onClick={() => setMediaType("tv")}
            >
              <h3>TV</h3>
            </div>
            <div
              className={`${styles.move} ${
                mediaType === "movie" ? styles.left : styles.right
              }`}
            ></div>
          </div>
        </div>
      </div>
      {mediaType === "movie" ? (
        <FadeInOut isLoading={isLoadingMovie}>
          {isErrorMovie ? (
            <HomeError message="영화 불러오기 실패" refetch={refetchMovie} />
          ) : (
            movieData?.results.map((movie: PopularMovieInfo, index: number) => (
              <HomeMovieCard key={index} movie={movie} type={"popularM"} />
            ))
          )}
        </FadeInOut>
      ) : (
        <FadeInOut isLoading={isLoadingTv}>
          {isErrorTv ? (
            <HomeError message="TV 불러오기 실패" refetch={refetchTv} />
          ) : (
            tvData?.results.map((movie: PopularTvInfo, index: number) => (
              <HomeMovieCard key={index} movie={movie} type={"popularT"} />
            ))
          )}
        </FadeInOut>
      )}
    </section>
  );
};

export default PopluarSection;
