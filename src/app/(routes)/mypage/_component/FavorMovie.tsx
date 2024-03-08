"use client";

import React from "react";
import styles from "./favorMovie.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getAllFavorList } from "@/app/_lib/getAllFavorList";
import { Session } from "next-auth";
import FavorMovieCard from "./FavorMovieCard";
import { DetailMovieResult } from "@/model/List";
import { useFavorFilterStore } from "@/app/_store/favorFilter";
import Link from "next/link";

type Props = {
  session: Session | null;
};

const FavorMovie = ({ session }: Props) => {
  const { data: favorData } = useQuery({
    queryKey: ["auth", "favor", session?.user?.id || ""],
    queryFn: getAllFavorList,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
    enabled: !!session?.user,
  });
  const { sortOption } = useFavorFilterStore();

  const sortFavor = () => {
    const filteredFavor = favorData?.filter(
      (v) => v.media_type === "movie"
    ) as DetailMovieResult[];
    switch (sortOption) {
      case "date_rec":
        return filteredFavor.sort(
          (a, b) =>
            new Date(b.release_date || "").getTime() -
            new Date(a.release_date || "").getTime()
        );
      case "date_old":
        return filteredFavor.sort(
          (a, b) =>
            new Date(a.release_date || "").getTime() -
            new Date(b.release_date || "").getTime()
        );
      case "vote_high":
        return filteredFavor.sort((a, b) => b.vote_average - a.vote_average);
      case "vote_low":
        return filteredFavor.sort((a, b) => a.vote_average - b.vote_average);
    }
  };

  if (sortFavor().length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.noFavor}>
          <div>관심 영화 목록이 없습니다.</div>
          <Link href={"/movie?sort_by=popularity.desc"} className={styles.go}>
            추가하러 가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {sortFavor().map((movie, index) => (
        <FavorMovieCard
          key={index}
          movie={movie as DetailMovieResult}
          session={session}
        />
      ))}
    </div>
  );
};

export default FavorMovie;
