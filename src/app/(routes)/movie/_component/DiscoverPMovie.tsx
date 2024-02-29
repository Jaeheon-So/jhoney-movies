"use client";

import useInfiniteScroll from "@/app/_hooks/useInfiniteScroll";
import { getDiscoverPMovie } from "@/app/_lib/getDiscoverPMovie";
import React, { Fragment } from "react";
import DiscoverMovieCard from "./DiscoverMovieCard";
import { PopularMovieInfo } from "@/model/Movie";
import styles from "./discoverPMovie.module.scss";

type Props = {
  searchParams: { sort_by?: string; with_genres?: string };
};

const DiscoverPMovie = ({ searchParams }: Props) => {
  const { ref, data, isFetching, isLoading } = useInfiniteScroll(
    ["movies", "popular", "movie", searchParams],
    getDiscoverPMovie
  );

  return (
    <>
      <div className={styles.container}>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.results.map((movie: PopularMovieInfo, index: number) => (
              <DiscoverMovieCard key={index} movie={movie} />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={ref} className={styles.loading}>
        {isFetching || isLoading ? <div>Loading...</div> : null}
      </div>
    </>
  );
};

export default DiscoverPMovie;
