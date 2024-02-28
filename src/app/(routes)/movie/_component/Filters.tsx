"use client";

import React, { useEffect } from "react";
import styles from "./filter.module.scss";
import SortFilter from "./SortFilter";
import GenreFilter from "./GenreFilter";
import BtnApplyFilter from "./BtnApplyFilter";
import { useSelectedLayoutSegments } from "next/navigation";
import { useMovieFilterStore } from "@/app/_store/movieFilter";

const Filters = () => {
  const pathArray = useSelectedLayoutSegments();
  const { setSortOption, resetGenre } = useMovieFilterStore();

  // useEffect(() => {
  //   if (pathArray.length === 0) {
  //     setSortOption("popularity.desc");
  //   } else if (pathArray.includes("top-rated")) {
  //     setSortOption("vote_average.desc");
  //   }
  // }, [pathArray]);

  if (pathArray.length > 0 && !pathArray.includes("top-rated")) return null;

  return (
    <div className={styles.filterWrapper}>
      <SortFilter />
      <GenreFilter />
      <BtnApplyFilter />
    </div>
  );
};

export default Filters;
