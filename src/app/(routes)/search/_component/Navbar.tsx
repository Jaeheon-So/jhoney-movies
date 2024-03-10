"use client";

import React, { useEffect } from "react";
import styles from "./navbar.module.scss";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation";
import { getSearchMovie } from "@/lib/movie/getSearchMovie";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getSearchTv } from "@/lib/tv/getSearchTv";
import { getSearchPeople } from "@/lib/people/getSearchPeople";

const Navbar = () => {
  const searchParam = useSearchParams();
  const segment = useSelectedLayoutSegment();
  const router = useRouter();

  const { data: movieSearch } = useInfiniteQuery({
    queryKey: ["movies", "search", "movie", searchParam.get("q") || ""],
    queryFn: getSearchMovie,
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
  });
  const { data: tvSearch } = useInfiniteQuery({
    queryKey: ["movies", "search", "tv", searchParam.get("q") || ""],
    queryFn: getSearchTv,
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
  });
  const { data: peopleSearch } = useInfiniteQuery({
    queryKey: ["people", "search", searchParam.get("q") || ""],
    queryFn: getSearchPeople,
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
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

  // useEffect(() => {
  //   const max = Math.max(
  //     Number(movieSearch?.pages[0].total_results),
  //     Number(tvSearch?.pages[0].total_results),
  //     Number(peopleSearch?.pages[0].total_results)
  //   );

  //   if (segment !== null) return;

  //   if (max === Number(movieSearch?.pages[0].total_results)) {
  //     router.replace(`/search?q=${searchParam.get("q")}`);
  //   } else if (max === Number(tvSearch?.pages[0].total_results)) {
  //     router.replace(`/search/tv?q=${searchParam.get("q")}`);
  //   } else if (max === Number(peopleSearch?.pages[0].total_results)) {
  //     router.replace(`/search/people?q=${searchParam.get("q")}`);
  //   } else {
  //     router.replace(`/search?q=${searchParam.get("q")}`);
  //   }
  // }, [peopleSearch]);

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
