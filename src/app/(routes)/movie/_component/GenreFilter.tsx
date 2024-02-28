"use client";

import React, { useState } from "react";
import styles from "./genreFliter.module.scss";
import {
  FaCaretDown,
  FaCaretUp,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

const GenreFilter = () => {
  const [isFilterOpen, setisFilterOpen] = useState(true);
  const [genreOption, setGenreOption] = useState<{ [key: number]: boolean }>({
    28: false,
    12: false,
    16: false,
    35: false,
    80: false,
    99: false,
    18: false,
    10751: false,
    14: false,
    36: false,
    27: false,
    10402: false,
    9648: false,
    10749: false,
    878: false,
    10770: false,
    53: false,
    10752: false,
    37: false,
  });

  const genres = [
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
    setGenreOption((prev) => ({ ...prev, [option]: !prev[option] }));
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
                    genreOption[Number(genre[0])] && styles.active
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
