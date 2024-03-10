"use client";

import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getDiscoverPMovie } from "@/lib/movie/getDiscoverPMovie";
import React, { Fragment } from "react";
import DiscoverMovieCard from "./DiscoverMovieCard";
import { PopularMovieInfo } from "@/model/Movie";
import styles from "./discoverPMovie.module.scss";
import LoadingCircle from "@/app/_components/LoadingCircle";
import HomeError from "@/app/_components/HomeError";

type Props = {
  searchParams: { sort_by?: string; with_genres?: string };
};

const DiscoverPMovie = ({ searchParams }: Props) => {
  const { ref, data, isFetching, isLoading, isError, refetch } =
    useInfiniteScroll(
      ["movies", "popular", "movie", searchParams],
      getDiscoverPMovie
    );

  return (
    <>
      <div className={styles.container}>
        {isError ? (
          <HomeError message="검색 오류" refetch={refetch} />
        ) : (
          data?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.results.map((movie: PopularMovieInfo, index: number) => (
                <DiscoverMovieCard key={index} movie={movie} />
              ))}
            </Fragment>
          ))
        )}
      </div>
      <div ref={ref} className={styles.loading}>
        {isFetching || isLoading ? <LoadingCircle /> : null}
      </div>
    </>
  );
};

export default DiscoverPMovie;
