"use client";

import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import styles from "./sortFilter.module.scss";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

const SortFilter = () => {
  const [isFilterOpen, setisFilterOpen] = useState(false);
  const [isSelectOpen, setisSelectOpen] = useState(false);
  const [sortOption, setSortOption] = useState("popularity.desc");

  const options = [
    ["유명한 순", "popularity.desc"],
    ["평점 순", "vote_average.desc"],
    ["최신 순", "primary_release_date.desc"],
  ];
  const optionObj: { [key: string]: string } = {
    "popularity.desc": "유명한 순",
    "vote_average.desc": "평점 순",
    "primary_release_date.desc": "최신 순",
  };

  const onFilterChange = (e: React.MouseEvent<HTMLDivElement>) => {
    setisFilterOpen((prev) => !prev);
    if (isFilterOpen) {
      setisSelectOpen(false);
    }
  };

  const onSelectChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setisSelectOpen((prev) => !prev);
  };

  const onChangeSortOption = (
    option: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    setSortOption(option);
    setisSelectOpen(false);
  };

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.section}>
        <div className={styles.filterTitle} onClick={onFilterChange}>
          <div>Sort</div>
          <div className={styles.svgWrapper}>
            {isFilterOpen ? <FaChevronDown /> : <FaChevronRight />}
          </div>
        </div>
        <div
          className={`${styles.selectContainer} ${
            isFilterOpen && styles.show
          } ${isSelectOpen && styles.show2}`}
        >
          <div className={`${styles.selectWrapper}`}>
            <div onClick={onSelectChange} className={styles.select}>
              <div>{optionObj[sortOption]}</div>
              <div className={styles.svgWrapper}>
                {isSelectOpen ? <FaCaretUp /> : <FaCaretDown />}
              </div>
              <div className={styles.relative}>
                {isSelectOpen && (
                  <div className={styles.optionWrapper}>
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className={`${styles.option} ${
                          sortOption === option[1] && styles.active
                        }`}
                        onClick={(e) => onChangeSortOption(option[1], e)}
                      >
                        {option[0]}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortFilter;
