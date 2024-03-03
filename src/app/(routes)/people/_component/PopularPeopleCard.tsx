"use client";

import { PopularPeopleInfo } from "@/model/People";
import React from "react";
import styles from "./popularPeopleCard.module.scss";
import Link from "next/link";
import Image from "next/image";
import { POSTER_BASE_URL } from "@/app/_constants/constants";

type Props = {
  people: PopularPeopleInfo;
};

const PopularPeopleCard = ({ people }: Props) => {
  return (
    <Link
      href={`/people/${people.id}-${people.original_name.split(" ").join("-")}`}
      className={`${styles.card}`}
    >
      <div className={styles.imgWrapper}>
        <Image
          src={
            people.profile_path === null
              ? "/no-image.svg"
              : POSTER_BASE_URL + people.profile_path
          }
          width={150}
          height={225}
          alt="poster"
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{people.name}</div>
        <div className={styles.known}>
          {people.known_for.map((k) => k.title || k.name).join(", ")}
        </div>
      </div>
    </Link>
  );
};

export default PopularPeopleCard;
