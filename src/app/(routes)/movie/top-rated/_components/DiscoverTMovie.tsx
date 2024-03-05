"use client";

import useInfiniteScroll from "@/app/_hooks/useInfiniteScroll";
import React, { Fragment } from "react";
import { PopularMovieInfo } from "@/model/Movie";
import styles from "./discoverTMovie.module.scss";
import DiscoverMovieCard from "../../_component/DiscoverMovieCard";
import { getDiscoverTMovie } from "@/app/_lib/getDiscoverTMovie";
import LoadingCircle from "@/app/_components/LoadingCircle";
import HomeError from "@/app/_components/HomeError";

type Props = {
  searchParams: { sort_by?: string; with_genres?: string };
};

const DiscoverTMovie = ({ searchParams }: Props) => {
  const { ref, data, isFetching, isLoading, isError, refetch } =
    useInfiniteScroll(
      ["movies", "top-rated", "movie", searchParams],
      getDiscoverTMovie
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

export default DiscoverTMovie;
