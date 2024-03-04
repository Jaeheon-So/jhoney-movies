"use client";

import useInfiniteScroll from "@/app/_hooks/useInfiniteScroll";
import { getSearchMovie } from "@/app/_lib/getSearchMovie";
import React, { Fragment } from "react";
import styles from "./searchMovie.module.scss";
import LoadingCircle from "@/app/_components/LoadingCircle";
import SearchMovieCard from "./SearchMovieCard";
import { SearchMovieInfo } from "@/model/Movie";

type Props = {
  q: string;
};

const SearchMovie = ({ q }: Props) => {
  const { ref, data, isFetching, isLoading } = useInfiniteScroll(
    ["movies", "search", "movie", q],
    getSearchMovie
  );

  return (
    <>
      <div className={styles.container}>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.results.map((movie: SearchMovieInfo, index: number) => (
              <SearchMovieCard key={index} movie={movie} />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={ref} className={styles.loading}>
        {isFetching || isLoading ? <LoadingCircle /> : null}
      </div>
    </>
  );
};

export default SearchMovie;
