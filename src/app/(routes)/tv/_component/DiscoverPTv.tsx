"use client";

import useInfiniteScroll from "@/app/_hooks/useInfiniteScroll";
import { getDiscoverPTv } from "@/app/_lib/getDiscoverPTv";
import { PopularTvInfo } from "@/model/Movie";
import React, { Fragment } from "react";
import styles from "./discoverPTv.module.scss";
import DiscoverTvCard from "./DiscoverTvCard";

type Props = {
  searchParams: { sort_by?: string; with_genres?: string };
};

const DiscoverPTv = ({ searchParams }: Props) => {
  const { ref, data, isFetching, isLoading } = useInfiniteScroll(
    ["movies", "popular", "tv", searchParams],
    getDiscoverPTv
  );

  return (
    <>
      <div className={styles.container}>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.results.map((movie: PopularTvInfo, index: number) => (
              <DiscoverTvCard key={index} movie={movie} />
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

export default DiscoverPTv;
