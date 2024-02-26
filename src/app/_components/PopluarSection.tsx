"use client";

import React, { useState } from "react";
import styles from "./popularSection.module.scss";
import { useQuery } from "@tanstack/react-query";
import FadeInOut from "./FadeInOut";
import MovieCard from "./MovieCard";
import { getPopularMovies } from "../_lib/getPopularMovies";
import { getPopularTv } from "../_lib/getPopularTv";
import { PopularMovieInfo, PopularTvInfo } from "@/model/Movie";

const PopluarSection = () => {
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");
  const { data: movieData, isLoading: isLoadingMovie } = useQuery({
    queryKey: ["movies", "popular", "movie"],
    queryFn: getPopularMovies,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
    enabled: mediaType === "movie",
  });

  const { data: tvData, isLoading: isLoadingTv } = useQuery({
    queryKey: ["movies", "popular", "tv"],
    queryFn: getPopularTv,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
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
              <h3>Movies</h3>
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
          {movieData?.results.map((movie: PopularMovieInfo, index: number) => (
            <MovieCard key={index} movie={movie} type={"popularM"} />
          ))}
        </FadeInOut>
      ) : (
        <FadeInOut isLoading={isLoadingTv}>
          {tvData?.results.map((movie: PopularTvInfo, index: number) => (
            <MovieCard key={index} movie={movie} type={"popularT"} />
          ))}
        </FadeInOut>
      )}
    </section>
  );
};

export default PopluarSection;
