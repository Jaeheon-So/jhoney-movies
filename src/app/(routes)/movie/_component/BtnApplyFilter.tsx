"use client";

import React from "react";
import styles from "./btnApply.module.scss";
import { useRouter } from "next/navigation";
import { useMovieFilterStore } from "@/app/_store/movieFilter";

const BtnApplyFilter = () => {
  const router = useRouter();
  const { sortOption, genreOption } = useMovieFilterStore();

  const onApplyFilter = () => {
    const newSearchParams = new URLSearchParams();
    let genreQuery = "";

    Object.keys(genreOption).forEach((key) => {
      if (genreOption[Number(key)]) {
        genreQuery += key + ".";
      }
    });

    newSearchParams.set("sort", sortOption);
    newSearchParams.set("genre", genreQuery.slice(0, -1));

    router.push(`/movie?${newSearchParams.toString()}`);
  };

  return (
    <div
      className={`${styles.btnWrapper} ${styles.active}`}
      onClick={onApplyFilter}
    >
      <button>Search</button>
    </div>
  );
};

export default BtnApplyFilter;
