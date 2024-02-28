"use client";

import React, { useState } from "react";
import styles from "./genreFliter.module.scss";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useMovieFilterStore } from "@/app/_store/movieFilter";

const GenreFilter = () => {
  const [isFilterOpen, setisFilterOpen] = useState(true);
  const { genreOption, setGenreOption } = useMovieFilterStore();

  const genres: [number, string][] = [
    [28, "액션"],
    [12, "모험"],
    [16, "애니메이션"],
    [35, "코미디"],
    [80, "범죄"],
    [99, "다큐멘터리"],
    [18, "드라마"],
    [10751, "가족"],
    [14, "판타지"],
    [36, "역사"],
    [27, "공포"],
    [10402, "음악"],
    [9648, "미스터리"],
    [10749, "로맨스"],
    [878, "SF"],
    [10770, "TV 영화"],
    [53, "스릴러"],
    [10752, "전쟁"],
    [37, "서부"],
  ];

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
          <div>Genres</div>
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
