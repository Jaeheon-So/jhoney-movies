import React from "react";
import styles from "./seasonCard.module.scss";
import { TvSeason } from "@/model/Movie";
import Image from "next/image";
import { POSTER_BASE_URL } from "@/app/_constants/constants";
import { FormatMDY } from "@/app/_utils/dayFormat";
import dynamic from "next/dynamic";

const RateCanvas = dynamic(() => import("@/canvas/RateCanvas"), {
  ssr: false,
});

type Props = {
  season: TvSeason;
};

const SeasonCard = ({ season }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgWrapper}>
        <Image
          src={
            season.poster_path === null
              ? "/no-image.svg"
              : POSTER_BASE_URL + season.poster_path
          }
          width={150}
          height={225}
          alt="poster"
          loading="lazy"
        />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.rest}>
          <div className={styles.number}>시즌 {season.season_number}</div>
          <div className={styles.date_rate}>
            <div className={styles.rate}>
              <RateCanvas vote_average={season?.vote_average || 0} size={40} />
            </div>
            <div className={styles.date}>{`${FormatMDY(season.air_date)} * ${
              season.episode_count
            } Episodes`}</div>
          </div>
        </div>
        <div className={styles.overview}>{season.overview}</div>
      </div>
    </div>
  );
};

export default SeasonCard;
