"use client";

import React, { useState } from "react";
import styles from "./genreFliter.module.scss";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { genres, useMovieFilterStore } from "@/store/movieFilter";

const GenreFilter = () => {
  const [isFilterOpen, setisFilterOpen] = useState(false);
  const { genreOption, setGenreOption } = useMovieFilterStore();

  const onFilterChange = (e: React.MouseEvent<HTMLDivElement>) => {
    setisFilterOpen((prev) => !prev);
  };

  const onChangeGenreOption = (
    option: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    setGenreOption(option);
  };

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.section}>
        <div className={styles.filterTitle} onClick={onFilterChange}>
          <div>장르</div>
          <div className={styles.svgWrapper}>
            {isFilterOpen ? <FaChevronDown /> : <FaChevronRight />}
          </div>
        </div>
        <div
          className={`${styles.selectContainer} ${
            isFilterOpen && styles.show
          } `}
        >
          <div className={`${styles.selectWrapper}`}>
            <div className={styles.select}>
              {genres.map((genre, index) => (
                <div
                  key={index}
                  className={`${styles.option} ${
                    genreOption[genre[0]] && styles.active
                  }`}
                  onClick={(e) => onChangeGenreOption(Number(genre[0]), e)}
                >
                  <div className={styles.name}>{genre[1]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreFilter;
