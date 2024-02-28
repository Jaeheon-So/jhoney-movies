"use client";

import React from "react";
import styles from "./btnApply.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMovieFilterStore } from "@/app/_store/movieFilter";

const BtnApplyFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();
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

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const checkDisabled = () => {
    if (searchParam.get("sort") !== sortOption) return false;

    const arr = Object.keys(genreOption).filter(
      (key) => genreOption[Number(key)] === true
    );

    if (!searchParam.get("genre")) {
      if (arr.length > 0) {
        return false;
      } else {
        return true;
      }
    } else {
      if (
        JSON.stringify(arr.sort()) !==
        JSON.stringify(searchParam.get("genre")?.split(".").sort())
      ) {
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <div
      className={`${styles.btnWrapper} ${!checkDisabled() && styles.active}`}
      onClick={onApplyFilter}
    >
      <button disabled={checkDisabled()}>Search</button>
    </div>
  );
};

export default BtnApplyFilter;
