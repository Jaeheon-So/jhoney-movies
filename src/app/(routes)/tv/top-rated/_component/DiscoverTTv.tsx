"use client";

import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getDiscoverTTv } from "@/lib/getDiscoverTTv";
import { PopularTvInfo } from "@/model/Movie";
import React, { Fragment } from "react";
import DiscoverTvCard from "../../_component/DiscoverTvCard";
import styles from "./discoverTTv.module.scss";
import LoadingCircle from "@/app/_components/LoadingCircle";
import HomeError from "@/app/_components/HomeError";

type Props = {
  searchParams: { sort_by?: string; with_genres?: string };
};

const DiscoverTTv = ({ searchParams }: Props) => {
  const { ref, data, isFetching, isLoading, isError, refetch } =
    useInfiniteScroll(
      ["movies", "top-rated", "tv", searchParams],
      getDiscoverTTv
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

export default DiscoverTTv;
