"use client";

import useInfiniteScroll from "@/app/_hooks/useInfiniteScroll";
import React, { Fragment } from "react";
import styles from "./searchTv.module.scss";
import LoadingCircle from "@/app/_components/LoadingCircle";
import { SearchTvInfo } from "@/model/Movie";
import { getSearchTv } from "@/app/_lib/getSearchTv";
import SearchTvCard from "./SearchTvCard";

type Props = {
  q: string;
};

const SearchTv = ({ q }: Props) => {
  const { ref, data, isFetching, isLoading } = useInfiniteScroll(
    ["movies", "search", "tv", q],
    getSearchTv
  );

  return (
    <>
      <div className={styles.container}>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.results.map((movie: SearchTvInfo, index: number) => (
              <SearchTvCard key={index} movie={movie} />
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

export default SearchTv;
