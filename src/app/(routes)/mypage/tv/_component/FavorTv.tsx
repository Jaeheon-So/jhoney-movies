"use client";

import React from "react";
import styles from "./favorTv.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getAllFavorList } from "@/app/_lib/getAllFavorList";
import { Session } from "next-auth";
import { useFavorFilterStore } from "@/app/_store/favorFilter";
import { DetailTvResult } from "@/model/List";
import FavorTvCard from "./FavorTvCard";

type Props = {
  session: Session | null;
};

const FavorTv = ({ session }: Props) => {
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
      (v) => v.media_type === "tv"
    ) as DetailTvResult[];
    switch (sortOption) {
      case "date_rec":
        return filteredFavor.sort(
          (a, b) =>
            new Date(b.first_air_date || "").getTime() -
            new Date(a.first_air_date || "").getTime()
        );
      case "date_old":
        return filteredFavor.sort(
          (a, b) =>
            new Date(a.first_air_date || "").getTime() -
            new Date(b.first_air_date || "").getTime()
        );
      case "vote_high":
        return filteredFavor.sort((a, b) => b.vote_average - a.vote_average);
      case "vote_low":
        return filteredFavor.sort((a, b) => a.vote_average - b.vote_average);
    }
  };

  return (
    <div className={styles.container}>
      {sortFavor().map((tv, index) => (
        <FavorTvCard key={index} tv={tv as DetailTvResult} session={session} />
      ))}
    </div>
  );
};

export default FavorTv;
