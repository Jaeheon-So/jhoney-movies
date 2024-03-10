"use client";

import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import React, { Fragment } from "react";
import styles from "./searchPeople.module.scss";
import LoadingCircle from "@/app/_components/LoadingCircle";
import { getSearchPeople } from "@/lib/people/getSearchPeople";
import SearchPeopleCard from "./SearchPeopleCard";
import { SearchPeopleInfo } from "@/model/People";
import HomeError from "@/app/_components/HomeError";
import NoResult from "@/app/_components/NoResult";

type Props = {
  q: string;
};

const SearchPeople = ({ q }: Props) => {
  const { ref, data, isFetching, isLoading, isError, refetch } =
    useInfiniteScroll(["people", "search", q], getSearchPeople);

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
              {page.results.map((people: SearchPeopleInfo, index: number) => (
                <SearchPeopleCard key={index} people={people} />
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

export default SearchPeople;
