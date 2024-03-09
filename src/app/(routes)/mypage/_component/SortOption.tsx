"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "../layout.module.scss";
import { SortOptionType, useFavorFilterStore } from "@/store/favorFilter";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

type Props = {};

const SortOption = ({}: Props) => {
  const { sortOption, setSortOption } = useFavorFilterStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const options: [string, SortOptionType][] = [
    ["최신 순", "date_rec"],
    ["오래된 순", "date_old"],
    ["평점 높은 순", "vote_high"],
    ["평점 낮은 순", "vote_low"],
  ];
  const optionObj: { [key: string]: string } = {
    vote_high: "평점 높은 순",
    vote_low: "평점 낮은 순",
    date_rec: "최신 순",
    date_old: "오래된 순",
  };

  const onChangeOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen((prev) => !prev);
  };

  const onChangeSortOption = (option: SortOptionType) => {
    setSortOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", outSideClick);

    return () => window.removeEventListener("mousedown", outSideClick);
  }, []);

  return (
    <div className={styles.sortContainer} ref={dropDownRef}>
      <div className={styles.sortWrapper} onClick={onChangeOpen}>
        <div className={styles.sort}>{optionObj[sortOption]}</div>
        <div className={styles.svgWrapper}>
          {isOpen ? <FaCaretUp /> : <FaCaretDown />}
        </div>
      </div>
      <div className={`${styles.dropdownWrapper} ${isOpen && styles.open}`}>
        {options.map((option, index) => (
          <div
            className={styles.options}
            key={index}
            onClick={() => onChangeSortOption(option[1])}
          >
            {option[0]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortOption;
