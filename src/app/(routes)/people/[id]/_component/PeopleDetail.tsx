"use client";

import React from "react";
import styles from "./peopleDetail.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getPeopleDetail } from "@/lib/people/getPeopleDetail";
import Image from "next/image";
import { POSTER_BASE_URL } from "@/constants/constants";
import { FormatMDY } from "@/utils/dayFormat";
import { calculateAge } from "@/utils/age";
import { getPeopleSns } from "@/lib/people/getPeopleSns";
import { SiInstagram, SiFacebook, SiTwitter } from "react-icons/si";
import Link from "next/link";
import { getSearchPeople } from "@/lib/people/getSearchPeople";
import { CreditCast, PeopleKnownFor } from "@/model/People";
import KnownForCard from "./KnownForCard";
import { getCombinedCredit } from "@/lib/people/getCombinedCredit";
import Career from "./Career";

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
  const { data: searchData } = useQuery({
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

  let castObj: { [key: string]: CreditCast[] } = {};
  const newCastData = creditData?.cast
    .map((c) => {
      let obj = { ...c };
      if (c.media_type === "tv") {
        obj.release_date = c.first_air_date;
        obj.title = c.name;
        obj.original_title = c.original_name;
      }
      return obj;
    })
    .filter((c) => c.release_date)
    .sort(
      (a, b) =>
        new Date(b.release_date || "").getTime() -
        new Date(a.release_date || "").getTime()
    );
  newCastData?.forEach((c) => {
    const y = c.release_date?.split("-")[0] || "";
    castObj[y] = castObj[y] ? [...castObj[y], c] : [c];
  });
  const newCastObj = Object.entries(castObj).sort(
    (a, b) => Number(b[0]) - Number(a[0])
  );

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
                  {detailData?.birthday &&
                    FormatMDY(detailData?.birthday || "") +
                      `(${calculateAge(detailData?.birthday || "")}살)`}
                </div>
              </div>
              <section className={styles.section}>
                <div className={styles.title}>
                  <div>알려진 작품</div>
                </div>
                <div className={styles.known}>
                  {searchData?.results[0].known_for?.map(
                    (known: PeopleKnownFor, index: number) => (
                      <KnownForCard key={index} known={known} />
                    )
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <section className={styles.careerWrapper}>
        <div className={styles.career}>
          <div className={styles.title}>
            <div>활동</div>
          </div>
          <div className={styles.creditWrapper}>
            {newCastObj?.map((c, index) => (
              <Career key={index} year={c[0]} info={c[1]} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PeopleDetail;
