"use client";

import useInfiniteScroll from "@/app/_hooks/useInfiniteScroll";
import React, { Fragment } from "react";
import { PopularMovieInfo } from "@/model/Movie";
import styles from "./discoverTMovie.module.scss";
import DiscoverMovieCard from "../../_component/DiscoverMovieCard";
import { getDiscoverTMovie } from "@/app/_lib/getDiscoverTMovie";

type Props = {
  searchParams: { sort_by?: string; with_genres?: string };
};

const DiscoverTMovie = ({ searchParams }: Props) => {
  const { ref, data, isFetching, isLoading } = useInfiniteScroll(
    ["movies", "top-rated", "movies", searchParams],
    getDiscoverTMovie
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

export default DiscoverTMovie;
