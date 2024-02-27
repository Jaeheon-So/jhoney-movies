"use client";

import React, { useState } from "react";
import styles from "./trendSection.module.scss";
import FadeInOut from "./FadeInOut";
import { useQuery } from "@tanstack/react-query";
import { getTrendMovies } from "../_lib/getTrendMovies";
import HomeMovieCard from "./HomeMovieCard";
import { TrendMovieInfo } from "@/model/Movie";

const TrendSection = () => {
  const [dateType, setDateType] = useState<"day" | "week">("day");
  const { data, isLoading } = useQuery({
    queryKey: ["movies", "trend", dateType],
    queryFn: getTrendMovies,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
  });

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h2>Trending</h2>
        <div className={styles.selectWrapper}>
          <div className={styles.select}>
            <div
              className={`${styles.choice} ${
                dateType === "day" ? styles.active : ""
              }`}
              onClick={() => setDateType("day")}
            >
              <h3>Today</h3>
            </div>
            <div
              className={`${styles.choice} ${
                dateType === "week" ? styles.active : ""
              }`}
              onClick={() => setDateType("week")}
            >
              <h3>Week</h3>
            </div>
            <div
              className={`${styles.move} ${
                dateType === "day" ? styles.left : styles.right
              }`}
            ></div>
          </div>
        </div>
      </div>
      <FadeInOut isLoading={isLoading}>
        {data?.results.map((movie: TrendMovieInfo, index: number) => (
          <HomeMovieCard key={index} movie={movie} type={"trend"} />
        ))}
      </FadeInOut>
    </section>
  );
};

export default TrendSection;
