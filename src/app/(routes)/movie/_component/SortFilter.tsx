"use client";

import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import styles from "./sortFilter.module.scss";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

const SortFilter = () => {
  const [isFilterOpen, setisFilterOpen] = useState(true);
  const [isSelectOpen, setisSelectOpen] = useState(false);
  const [sortOption, setSortOption] = useState("유명한 순");

  const options = ["유명한 순", "평점 순", "최신 순"];

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
    <div className={styles.sectionWrapper} onClick={onFilterChange}>
      <div className={styles.section}>
        <div className={styles.filterTitle}>
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
              <div>{sortOption}</div>
              <div className={styles.svgWrapper}>
                {isSelectOpen ? <FaCaretUp /> : <FaCaretDown />}
              </div>
              <div className={styles.relative}>
                {isSelectOpen && (
                  <div className={styles.optionWrapper}>
                    {options.map((option) => (
                      <div
                        className={`${styles.option} ${
                          sortOption === option && styles.active
                        }`}
                        onClick={(e) => onChangeSortOption(option, e)}
                      >
                        {option}
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
