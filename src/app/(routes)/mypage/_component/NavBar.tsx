"use client";

import React from "react";
import styles from "../layout.module.scss";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllFavorList } from "@/lib/favor/getAllFavorList";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

const NavBar = ({ session }: Props) => {
  const segment = useSelectedLayoutSegment();
  const { data: favorData } = useQuery({
    queryKey: ["auth", "favor", session?.user?.id || ""],
    queryFn: getAllFavorList,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
    enabled: !!session?.user,
  });

  return (
    <div className={styles.nav}>
      <Link
        href={"/mypage"}
        className={`${styles.li} ${segment === null && styles.active}`}
      >
        Movie
        {`(${favorData?.filter((v) => v.media_type === "movie").length || 0})`}
      </Link>
      <Link
        href={"/mypage/tv"}
        className={`${styles.li} ${segment === "tv" && styles.active}`}
      >
        TV{`(${favorData?.filter((v) => v.media_type === "tv").length || 0})`}
      </Link>
    </div>
  );
};

export default NavBar;
