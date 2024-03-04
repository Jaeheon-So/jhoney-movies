"use client";

import React from "react";
import styles from "./peopleDetail.module.scss";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPeopleDetail } from "@/app/_lib/getPeopleDetail";
import Image from "next/image";
import { POSTER_BASE_URL } from "@/app/_constants/constants";
import { FormatMDY } from "@/app/_utils/dayFormat";
import { calculateAge } from "@/app/_utils/age";
import FadeInOut from "@/app/_components/FadeInOut";
import { getPeopleSns } from "@/app/_lib/getPeopleSns";
import { SiInstagram, SiFacebook, SiTwitter } from "react-icons/si";
import Link from "next/link";
import { getSearchPeople } from "@/app/_lib/getSearchPeople";
import { PeopleKnownFor } from "@/model/People";
import KnownForCard from "./KnownForCard";
import { getCombinedCredit } from "@/app/_lib/getCombinedCredit";

type Props = {
  id: string;
  name: string;
};

const PeopleDetail = ({ id, name }: Props) => {
  const { data: detailData } = useQuery({
    queryKey: ["people", "detail", id],
    queryFn: getPeopleDetail,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
  });
  const { data: snsData } = useQuery({
    queryKey: ["people", "sns", id],
    queryFn: getPeopleSns,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
  });
  const { data: searchData, isLoading } = useQuery({
    queryKey: ["people", "search", name],
    queryFn: getSearchPeople,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
  });
  const { data: creditData } = useQuery({
    queryKey: ["people", "credit", id],
    queryFn: getCombinedCredit,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 5,
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.infoWrapper}>
          <div className={styles.info}>
            <div className={styles.imageWrapper}>
              <Image
                src={
                  detailData?.profile_path === null
                    ? "/no-image.svg"
                    : POSTER_BASE_URL + detailData?.profile_path
                }
                width={300}
                height={450}
                loading="lazy"
                alt="poster"
              />
            </div>
            <div className={styles.left}>
              <div className={styles.titleWrapper}>
                <div className={styles.title}>{detailData?.name}</div>
                <div className={styles.sns}>
                  {snsData?.instagram_id && (
                    <Link
                      href={`https://www.instagram.com/${snsData?.instagram_id}`}
                      target="_blank"
                      className={styles.svgWrapper}
                    >
                      <SiInstagram />
                    </Link>
                  )}
                  {snsData?.twitter_id && (
                    <Link
                      href={`https://twitter.com/${snsData.twitter_id}`}
                      target="_blank"
                      className={styles.svgWrapper}
                    >
                      <SiTwitter />
                    </Link>
                  )}
                  {snsData?.facebook_id && (
                    <Link
                      href={`https://www.facebook.com/${snsData.facebook_id}`}
                      target="_blank"
                      className={styles.svgWrapper}
                    >
                      <SiFacebook />
                    </Link>
                  )}
                </div>
              </div>
              {detailData?.biography && (
                <div className={styles.bioWrapper}>
                  <div className={styles.bio}>{detailData?.biography}</div>
                </div>
              )}
              <div className={styles.birthWrapper}>
                <div className={styles.birthTitle}>출생년도</div>
                <div className={styles.birth}>
                  {FormatMDY(detailData?.birthday || "") +
                    `(${calculateAge(detailData?.birthday || "")}살)`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className={styles.section}>
        <div className={styles.title}>
          <h2>알려진 작품</h2>
        </div>
        <FadeInOut isLoading={isLoading}>
          {searchData?.results[0].known_for?.map(
            (known: PeopleKnownFor, index: number) => (
              <KnownForCard key={index} known={known} />
            )
          )}
        </FadeInOut>
      </section>
    </>
  );
};

export default PeopleDetail;
