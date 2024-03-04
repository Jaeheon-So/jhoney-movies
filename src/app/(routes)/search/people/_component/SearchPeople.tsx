"use client";

import useInfiniteScroll from "@/app/_hooks/useInfiniteScroll";
import React, { Fragment } from "react";
import styles from "./searchPeople.module.scss";
import LoadingCircle from "@/app/_components/LoadingCircle";
import { getSearchPeople } from "@/app/_lib/getSearchPeople";
import SearchPeopleCard from "./SearchPeopleCard";
import { SearchPeopleInfo } from "@/model/People";

type Props = {
  q: string;
};

const SearchPeople = ({ q }: Props) => {
  const { ref, data, isFetching, isLoading } = useInfiniteScroll(
    ["people", "search", q],
    getSearchPeople
  );

  return (
    <>
      <div className={styles.container}>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.results.map((people: SearchPeopleInfo, index: number) => (
              <SearchPeopleCard key={index} people={people} />
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

export default SearchPeople;
