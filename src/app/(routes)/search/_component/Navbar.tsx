"use client";

import React from "react";
import styles from "./navbar.module.scss";
import Link from "next/link";
import { useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import { getSearchMovie } from "@/lib/movie/getSearchMovie";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchTv } from "@/lib/tv/getSearchTv";
import { getSearchPeople } from "@/lib/people/getSearchPeople";

const Navbar = () => {
  const searchParam = useSearchParams();
  const segment = useSelectedLayoutSegment();

  const { data: movieSearch } = useInfiniteQuery({
    queryKey: ["movies", "search", "movie", searchParam.get("q") || ""],
    queryFn: getSearchMovie,
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });
  const { data: tvSearch } = useInfiniteQuery({
    queryKey: ["movies", "search", "tv", searchParam.get("q") || ""],
    queryFn: getSearchTv,
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });
  const { data: peopleSearch } = useInfiniteQuery({
    queryKey: ["people", "search", searchParam.get("q") || ""],
    queryFn: getSearchPeople,
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  const navMenuData = [
    {
      id: "menu1",
      name: "Movies",
      count: movieSearch?.pages[0].total_results,
      path: "/movie",
      segment: "movie",
    },
    {
      id: "menu2",
      name: "Tv Shows",
      count: tvSearch?.pages[0].total_results,
      path: "/tv",
      segment: "tv",
    },
    {
      id: "menu3",
      name: "People",
      count: peopleSearch?.pages[0].total_results,
      path: "/people",
      segment: "people",
    },
  ];

  return (
    <div className={styles.nav}>
      {navMenuData.map((menu) => (
        <Link
          href={`/search${menu.path}?q=${searchParam.get("q")}`}
          key={menu.id}
          className={`${styles.el} ${
            segment === menu.segment && styles.active
          }`}
        >
          <div className={styles.name}>{menu.name}</div>
          <div className={styles.countWrapper}>
            <div className={styles.count}>{menu.count}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
