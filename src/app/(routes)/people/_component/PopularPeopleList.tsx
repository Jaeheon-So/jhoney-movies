"use client";

import React, { Fragment } from "react";
import styles from "./popularPeopleList.module.scss";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getPopularPeople } from "@/lib/people/getPopularPeople";
import LoadingCircle from "@/app/_components/LoadingCircle";
import { PopularPeopleInfo } from "@/model/People";
import PopularPeopleCard from "./PopularPeopleCard";
import HomeError from "@/app/_components/HomeError";

type Props = {};

const PopularPeopleList = ({}: Props) => {
  const { ref, data, isFetching, isLoading, isError, refetch } =
    useInfiniteScroll(["people", "popular"], getPopularPeople);

  return (
    <>
      <div className={styles.container}>
        {isError ? (
          <HomeError message="검색 오류" refetch={refetch} />
        ) : (
          data?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.results.map((people: PopularPeopleInfo, index: number) => (
                <PopularPeopleCard key={index} people={people} />
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

export default PopularPeopleList;
