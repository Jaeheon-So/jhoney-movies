"use client";

import React from "react";
import styles from "./trendSection.module.scss";
import FadeInOut from "./FadeInOut";
import { useQuery } from "@tanstack/react-query";
import { getTrendMovies } from "../_lib/getTrendMovies";
import MovieCard from "./MovieCard";

const TrendSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["movies", "trend"],
    queryFn: getTrendMovies,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h2>Trending</h2>
        <div></div>
      </div>
      <FadeInOut isLoading={isLoading}>
        {data?.results.map((movie: any, index: number) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </FadeInOut>
    </section>
  );
};

export default TrendSection;
