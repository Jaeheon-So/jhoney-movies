import React from "react";
import styles from "./favorMovieCard.module.scss";
import { DetailMovieResult, DetailTvResult } from "@/model/List";
import Image from "next/image";
import { POSTER_BASE_URL } from "@/app/_constants/constants";
import { FormatMDY } from "@/app/_utils/dayFormat";
import { IoMdHeart } from "react-icons/io";
import dynamic from "next/dynamic";
import Link from "next/link";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFavorList } from "@/app/_lib/removeFavorList";
import { Session } from "next-auth";

const RateCanvas = dynamic(() => import("@/canvas/RateCanvas"), {
  ssr: false,
});

type Props = {
  movie: DetailMovieResult;
  session: Session | null;
};

const FavorMovieCard = ({ movie, session }: Props) => {
  const queryClient = useQueryClient();
  const removeFavor = useMutation({
    mutationFn: removeFavorList,
    onMutate: () => {
      const value: (DetailMovieResult | DetailTvResult)[] | undefined =
        queryClient.getQueryData(["auth", "favor", session?.user?.id || ""]);

      let previousData = {} as { queryKey: QueryKey; data: any };

      if (value !== undefined) {
        previousData = {
          queryKey: ["auth", "favor", session?.user?.id || ""],
          data: [...value],
        };
        const shallow = value.filter((v) => v.id !== movie?.id);
        queryClient.setQueryData(
          ["auth", "favor", session?.user?.id || ""],
          shallow
        );
      }
      alert("관심목록에서 삭제했습니다.");
      return { previousData };
    },
    onError: (error, _, context) => {
      console.error(error);
      alert("관심목록 삭제 중 에러가 발생했습니다.");

      queryClient.setQueryData(
        context?.previousData.queryKey!,
        context?.previousData.data
      );
    },
    onSettled: async () => {
      // await queryClient.invalidateQueries({
      //   queryKey: ["auth"],
      // });
    },
  });

  const onRemove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const arg = {
      list_id: session?.user?.id || "",
      detail_type: "movie",
      detail_id: movie?.id || 0,
    };

    removeFavor.mutate(arg);
  };

  return (
    <Link href={`/movie/${movie.id}`} className={styles.card}>
      <div className={styles.imgWrapper}>
        <Image
          src={
            movie.poster_path === null
              ? "/no-image.svg"
              : POSTER_BASE_URL + movie.poster_path
          }
          width={150}
          height={225}
          alt="poster"
          loading="lazy"
        />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.info}>
          <div className={styles.rest}>
            <div className={styles.name}>{movie.title}</div>
            <div className={styles.date}>
              {movie?.release_date && FormatMDY(movie.release_date)}
            </div>
          </div>
          <div className={styles.rate_heart}>
            <div>
              <RateCanvas vote_average={movie?.vote_average || 0} size={40} />
            </div>

            <div
              className={`${styles.svgWrapper} ${styles.active}`}
              onClick={onRemove}
            >
              <IoMdHeart />
            </div>
          </div>
        </div>
        <div className={styles.overview}>{movie.overview}</div>
      </div>
    </Link>
  );
};

export default FavorMovieCard;
