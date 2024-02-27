"use client";

import React, { useEffect, useState } from "react";
import styles from "./trailerSection.module.scss";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTrendMovies } from "../_lib/getTrendMovies";
import FadeInOut from "./FadeInOut";
import {
  PopularMovieInfo,
  PopularMovieTrailerResponse,
  TrendMovieInfo,
} from "@/model/Movie";
import MovieCard from "./MovieCard";
import { getPopularMovies } from "../_lib/getPopularMovies";
import { getMovieTrailers } from "../_lib/getMovieTrailers";
import TrailerCard from "./TrailerCard";

const TrailerSection = () => {
  const [dateType, setDateType] = useState<"day" | "week">("day");
  const { data: movieData, isLoading } = useQuery({
    queryKey: ["movies", "popular", "movie"],
    queryFn: getPopularMovies,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  const trailerData: { data: PopularMovieTrailerResponse[]; pending: boolean } =
    useQueries({
      queries: movieData
        ? movieData.results.map((movie) => ({
            queryKey: ["movies", "trailers", movie.id],
            queryFn: () => getMovieTrailers(movie.id),
            staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
            gcTime: 300 * 1000,
            enabled: !!movieData,
          }))
        : [],
      combine: (results) => {
        return {
          data: results.map((result) => result.data),
          pending: results.some((result) => result.isPending),
        };
      },
    });

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h2>Trailers</h2>
          <div className={styles.selectWrapper}>
            <div className={styles.select}>
              <div
                className={`${styles.choice} ${
                  dateType === "day" ? styles.active : ""
                }`}
                onClick={() => setDateType("day")}
              >
                <h3>Popular</h3>
              </div>
              <div
                className={`${styles.choice} ${
                  dateType === "week" ? styles.active : ""
                }`}
                onClick={() => setDateType("week")}
              >
                <h3>TV</h3>
              </div>
              <div
                className={`${styles.move} ${
                  dateType === "day" ? styles.left : styles.right
                }`}
              ></div>
            </div>
          </div>
        </div>
        <FadeInOut
          isLoading={isLoading || trailerData.pending}
          isTrailer={true}
        >
          {movieData?.results.map((movie: PopularMovieInfo, index: number) => (
            <TrailerCard
              key={index}
              movie={movie}
              trailer={trailerData.data[index]}
            />
          ))}
        </FadeInOut>
      </div>
    </section>
  );
};

export default TrailerSection;
