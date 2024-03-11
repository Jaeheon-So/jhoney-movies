"use client";

import React from "react";
import styles from "../layout.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getAllFavorList } from "@/lib/favor/getAllFavorList";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

const FavorCount = ({ session }: Props) => {
  const { data: favorData } = useQuery({
    queryKey: ["auth", "favor", session?.user?.id || ""],
    queryFn: getAllFavorList,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
    enabled: !!session?.user,
  });

  return (
    <div className={styles.count}>
      관심목록 개수: {favorData?.length || 0}개
    </div>
  );
};

export default FavorCount;
