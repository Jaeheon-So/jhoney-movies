"use client";

import { getSearchMovie } from "@/app/_lib/getSearchMovie";
import { getSearchPeople } from "@/app/_lib/getSearchPeople";
import { getSearchTv } from "@/app/_lib/getSearchTv";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  q: string;
};

const RedirectSearch = ({ q }: Props) => {
  const router = useRouter();
  const { data: movieSearch } = useInfiniteQuery({
    queryKey: ["movies", "search", "movie", q],
    queryFn: getSearchMovie,
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
  });
  const { data: tvSearch } = useInfiniteQuery({
    queryKey: ["movies", "search", "tv", q],
    queryFn: getSearchTv,
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
  });
  const { data: peopleSearch } = useInfiniteQuery({
    queryKey: ["people", "search", q],
    queryFn: getSearchPeople,
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
  });

  useEffect(() => {
    const max = Math.max(
      Number(movieSearch?.pages[0].total_results),
      Number(tvSearch?.pages[0].total_results),
      Number(peopleSearch?.pages[0].total_results)
    );

    if (max === Number(movieSearch?.pages[0].total_results)) {
      router.replace(`/search/movie?q=${q}`);
    } else if (max === Number(tvSearch?.pages[0].total_results)) {
      router.replace(`/search/tv?q=${q}`);
    } else if (max === Number(peopleSearch?.pages[0].total_results)) {
      router.replace(`/search/people?q=${q}`);
    } else {
      router.replace(`/search/movie?q=${q}`);
    }
  }, [movieSearch, tvSearch, peopleSearch]);

  return null;
};

export default RedirectSearch;
