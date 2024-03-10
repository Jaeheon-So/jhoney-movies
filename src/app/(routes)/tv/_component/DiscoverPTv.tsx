"use client";

import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getDiscoverPTv } from "@/lib/tv/getDiscoverPTv";
import { PopularTvInfo } from "@/model/Movie";
import React, { Fragment } from "react";
import styles from "./discoverPTv.module.scss";
import DiscoverTvCard from "./DiscoverTvCard";
import LoadingCircle from "@/app/_components/LoadingCircle";
import HomeError from "@/app/_components/HomeError";

type Props = {
  searchParams: { sort_by?: string; with_genres?: string };
};

const DiscoverPTv = ({ searchParams }: Props) => {
  const { ref, data, isFetching, isLoading, isError, refetch } =
    useInfiniteScroll(
      ["movies", "popular", "tv", searchParams],
      getDiscoverPTv
    );

  return (
    <>
      <div className={styles.container}>
        {isError ? (
          <HomeError message="검색 오류" refetch={refetch} />
        ) : (
          data?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.results.map((movie: PopularTvInfo, index: number) => (
                <DiscoverTvCard key={index} movie={movie} />
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

export default DiscoverPTv;
