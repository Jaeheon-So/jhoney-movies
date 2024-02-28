"use client";

import React, { useEffect } from "react";
import styles from "./filter.module.scss";
import SortFilter from "./SortFilter";
import GenreFilter from "./GenreFilter";
import BtnApplyFilter from "./BtnApplyFilter";
import { useSearchParams, useSelectedLayoutSegments } from "next/navigation";
import { SortOptionType, useMovieFilterStore } from "@/app/_store/movieFilter";

const Filters = () => {
  const pathArray = useSelectedLayoutSegments();
  const { genreOption, setSortOption, setGenreOption, resetGenre } =
    useMovieFilterStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    const arr = searchParams.get("genre")?.split(".");

    Object.keys(genreOption).forEach((key) => {
      if (arr?.includes(key)) {
        setGenreOption(Number(key), true);
      } else {
        setGenreOption(Number(key), false);
      }
    });

    setSortOption(
      (searchParams.get("sort") as SortOptionType) || "popularity.desc"
    );
  }, [searchParams]);

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
