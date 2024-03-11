"use client";

import React, { useMemo } from "react";
import styles from "./favorMovie.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getAllFavorList } from "@/lib/favor/getAllFavorList";
import { Session } from "next-auth";
import FavorMovieCard from "./FavorMovieCard";
import { DetailMovieResult } from "@/model/List";
import { useFavorFilterStore } from "@/store/favorFilter";
import Link from "next/link";

type Props = {
  session: Session | null;
};

const FavorMovie = ({ session }: Props) => {
  const { data: favorData } = useQuery({
    queryKey: ["auth", "favor", session?.user?.id || ""],
    queryFn: getAllFavorList,
  });
  const { sortOption } = useFavorFilterStore();
  const filteredFavor = favorData?.filter(
    (v) => v.media_type === "movie"
  ) as DetailMovieResult[];

  const sortFavor = () => {
    switch (sortOption) {
      case "date_rec":
        return filteredFavor?.sort(
          (a, b) =>
            new Date(b.release_date || "").getTime() -
            new Date(a.release_date || "").getTime()
        );
      case "date_old":
        return filteredFavor?.sort(
          (a, b) =>
            new Date(a.release_date || "").getTime() -
            new Date(b.release_date || "").getTime()
        );
      case "vote_high":
        return filteredFavor?.sort((a, b) => b.vote_average - a.vote_average);
      case "vote_low":
        return filteredFavor?.sort((a, b) => a.vote_average - b.vote_average);
    }
  };
  const sortedFavor = useMemo(sortFavor, [sortOption, favorData]);

  if (filteredFavor.length === 0) {
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
      {sortedFavor.map((movie, index) => (
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
