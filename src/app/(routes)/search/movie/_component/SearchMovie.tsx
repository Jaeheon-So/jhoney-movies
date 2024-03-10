"use client";

import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getSearchMovie } from "@/lib/movie/getSearchMovie";
import React, { Fragment } from "react";
import styles from "./searchMovie.module.scss";
import LoadingCircle from "@/app/_components/LoadingCircle";
import SearchMovieCard from "./SearchMovieCard";
import { SearchMovieInfo } from "@/model/Movie";
import HomeError from "@/app/_components/HomeError";
import NoResult from "@/app/_components/NoResult";

type Props = {
  q: string;
};

const SearchMovie = ({ q }: Props) => {
  const { ref, data, isFetching, isLoading, isError, refetch } =
    useInfiniteScroll(["movies", "search", "movie", q], getSearchMovie);

  return (
    <>
      <div className={styles.container}>
        {isError ? (
          <HomeError message="검색 오류" refetch={refetch} />
        ) : data?.pages[0].results.length === 0 ? (
          <NoResult q={q} />
        ) : (
          data?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.results.map((movie: SearchMovieInfo, index: number) => (
                <SearchMovieCard key={index} movie={movie} />
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

export default SearchMovie;
