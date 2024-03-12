"use client";

import FadeInOut from "@/app/_components/FadeInOut";
import { getTvCredit } from "@/lib/tv/getTvCredit";
import { getTvDetail } from "@/lib/tv/getTvDetail";
import { getTvTrailers } from "@/lib/tv/getTvTrailers";
import { TvCast, TvTrailerResponse } from "@/model/Movie";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./tvDetail.module.scss";
import {
  POSTER_BASE_URL,
  POSTER_BASE_URL_w1920_H_427,
} from "@/constants/constants";
import { FormatMDY } from "@/utils/dayFormat";
import { IoMdHeart } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import CreditCard from "./CreditCard";
import SeasonCard from "./SeasonCard";
import { Session } from "next-auth";
import { getAllFavorList } from "@/lib/favor/getAllFavorList";
import { addFavorList } from "@/lib/favor/addFavorList";
import { removeFavorList } from "@/lib/favor/removeFavorList";
import { DetailMovieResult, DetailTvResult } from "@/model/List";
import { useRouter } from "next/navigation";
import { notify } from "@/app/_components/Toast";
import { useModalStore } from "@/store/confirmModal";

const RateCanvas = dynamic(() => import("@/canvas/RateCanvas"), {
  ssr: false,
});

type Props = {
  id: string;
  session: Session | null;
};

const TvDetail = ({ id, session }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: tvDetail } = useQuery({
    queryKey: ["movies", "detail", "tv", id],
    queryFn: getTvDetail,
  });
  const { data: trailerData } = useQuery<TvTrailerResponse>({
    queryKey: ["movies", "trailers", "tv", id],
    queryFn: () => getTvTrailers(Number(id)),
  });
  const { data: creditData, isLoading } = useQuery({
    queryKey: ["movies", "credits", "tv", id],
    queryFn: getTvCredit,
  });
  const { data: favorData } = useQuery({
    queryKey: ["auth", "favor", session?.user?.id || ""],
    queryFn: getAllFavorList,

    enabled: !!session?.user,
  });
  const { openModal, closeModal } = useModalStore();

  const index = trailerData?.results?.findIndex((t) => t.type === "Trailer");
  const isFavor = favorData?.find((f) => f.id === Number(id));

  const changeMToHM = (min: number | undefined) => {
    if (min === undefined) return "";
    return `${Math.floor(min / 60)}h ${min % 60}m`;
  };

  const addFavor = useMutation({
    mutationFn: addFavorList,
    onMutate: () => {
      const value: (DetailMovieResult | DetailTvResult)[] | undefined =
        queryClient.getQueryData(["auth", "favor", session?.user?.id || ""]);

      let previousData = {} as { queryKey: QueryKey; data: any };

      if (value !== undefined) {
        previousData = {
          queryKey: ["auth", "favor", session?.user?.id || ""],
          data: [...value],
        };
        const shallow = [...value, { ...tvDetail, media_type: "tv" }];
        queryClient.setQueryData(
          ["auth", "favor", session?.user?.id || ""],
          shallow
        );
      }

      notify({ type: "success", content: "관심목록에 추가했습니다." });
      return { previousData };
    },
    onError: (error, _, context) => {
      console.error(error);
      notify({
        type: "error",
        content: "관심목록 추가 중 오류가 발생했습니다.",
      });

      queryClient.setQueryData(
        context?.previousData.queryKey!,
        context?.previousData.data
      );
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
    },
  });

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
        const shallow = value.filter((v) => v.id !== tvDetail?.id);
        queryClient.setQueryData(
          ["auth", "favor", session?.user?.id || ""],
          shallow
        );
      }

      notify({ type: "success", content: "관심목록에서 삭제했습니다." });
      return { previousData };
    },
    onError: (error, _, context) => {
      console.error(error);
      notify({
        type: "error",
        content: "관심목록 삭제 중 오류가 발생했습니다.",
      });

      queryClient.setQueryData(
        context?.previousData.queryKey!,
        context?.previousData.data
      );
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
    },
  });

  const toggleFavor = () => {
    if (!session?.user) {
      return openModal({
        title: "관심목록 등록",
        content: (
          <div>
            로그인이 필요한 서비스입니다.
            <br />
            로그인 하시겠습니까?
          </div>
        ),
        confirmCallback: () => {
          closeModal();
          router.push(`/login?callbackUrl=/movie/${tvDetail?.id}`);
        },
      });
    }
    const arg = {
      list_id: session?.user?.id || "",
      detail_type: "tv",
      detail_id: tvDetail?.id || 0,
    };
    if (!isFavor) addFavor.mutate(arg);
    else removeFavor.mutate(arg);
  };

  return (
    <>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${
            POSTER_BASE_URL_w1920_H_427 + tvDetail?.backdrop_path
          })`,
        }}
      >
        <div className={styles.infoWrapper}>
          <div className={styles.info}>
            <div className={styles.imageWrapper}>
              <Image
                src={
                  tvDetail?.poster_path === null
                    ? "/no-image.svg"
                    : POSTER_BASE_URL + tvDetail?.poster_path
                }
                width={300}
                height={450}
                loading="lazy"
                alt="poster"
              />
            </div>
            <div className={styles.left}>
              <div className={styles.titleWrapper}>
                <div className={styles.title}>{tvDetail?.name}</div>
                <div className={styles.rest}>
                  <div className={styles.date}>
                    {tvDetail?.first_air_date &&
                      FormatMDY(tvDetail.first_air_date)}
                  </div>
                  <div className={styles.genre}>
                    {tvDetail?.genres.map((genre) => genre.name).join(", ")}
                  </div>
                  <div className={styles.time}>
                    {tvDetail?.episode_run_time &&
                    tvDetail?.episode_run_time.length > 0
                      ? changeMToHM(tvDetail?.episode_run_time[0])
                      : null}
                  </div>
                </div>
              </div>
              <div className={styles.actions}>
                <div>
                  <RateCanvas
                    vote_average={tvDetail?.vote_average || 0}
                    size={60}
                  />
                </div>
                <div
                  className={`${styles.svgWrapper} ${isFavor && styles.active}`}
                  onClick={toggleFavor}
                >
                  <IoMdHeart />
                </div>
                {index && index >= 0 ? (
                  <Link
                    href={`/play?k=${trailerData?.results[index]?.key}`}
                    className={styles.trailer}
                  >
                    <div className={styles.svgWrapper2}>
                      <FaPlay />
                    </div>
                    <div>play Trailer</div>
                  </Link>
                ) : null}
              </div>
              <div className={styles.tagline}>{tvDetail?.tagline}</div>
              <div className={styles.overviewWrapper}>
                <div className={styles.oTitle}>줄거리</div>
                <div className={styles.overview}>{tvDetail?.overview}</div>
              </div>
              <div className={styles.directorWrapper}>
                <div className={styles.dTitle}>제작</div>
                <div className={styles.creators}>
                  {tvDetail?.created_by.map((people, index) => (
                    <Link
                      href={`/people/${people?.id}-${people?.name
                        .split(" ")
                        .join("-")}`}
                      className={styles.director}
                      key={index}
                    >
                      {people?.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className={styles.section}>
        <div className={styles.title}>
          <h2>출연진</h2>
        </div>
        <FadeInOut isLoading={isLoading}>
          {creditData?.cast.slice(0, 21).map((cast: TvCast, index: number) => (
            <CreditCard key={index} cast={cast} />
          ))}
        </FadeInOut>
      </section>
      <section className={styles.section2}>
        <div className={styles.title}>
          <h2>시즌</h2>
        </div>
        <div className={styles.seasonWrapper}>
          {tvDetail?.seasons.map((season, index) => (
            <SeasonCard season={season} key={index} />
          ))}
        </div>
      </section>
    </>
  );
};

export default TvDetail;
