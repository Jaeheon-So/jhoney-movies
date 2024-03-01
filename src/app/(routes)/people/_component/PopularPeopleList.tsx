"use client";

import React, { Fragment } from "react";
import styles from "./popularPeopleList.module.scss";
import useInfiniteScroll from "@/app/_hooks/useInfiniteScroll";
import { getPopularPeople } from "@/app/_lib/getPopularPeople";
import LoadingCircle from "@/app/_components/LoadingCircle";
import { PopularPeopleInfo } from "@/model/People";
import PopularPeopleCard from "./PopularPeopleCard";

type Props = {};

const PopularPeopleList = ({}: Props) => {
  const { ref, data, isFetching, isLoading } = useInfiniteScroll(
    ["people", "popular"],
    getPopularPeople
  );

  return (
    <>
      <div className={styles.container}>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.results.map((people: PopularPeopleInfo, index: number) => (
              <PopularPeopleCard key={index} people={people} />
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

export default PopularPeopleList;
