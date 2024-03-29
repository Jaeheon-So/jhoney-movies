"use client";

import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./fadeInOut.module.scss";
import Loading from "./Loading";

type Props = {
  children: ReactNode;
  isLoading: boolean;
  isTrailer?: boolean;
  isKnown?: boolean;
};

const FadeInOut = ({ children, isLoading, isTrailer, isKnown }: Props) => {
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 50,
  });

  const [showSK, setShowSK] = useState(true);

  const checkClassName = useMemo(() => {
    // if (!inView) return "";
    if (isLoading && showSK) return "";
    else if (isLoading === false && showSK === true && inView === true)
      return styles.fadeout as string;
    else if (isLoading === false && showSK === false)
      return styles.fadein as string;
  }, [showSK, isLoading, inView]);

  useEffect(() => {
    if (inView) {
      if (isLoading === false && showSK === true) {
        setTimeout(() => setShowSK(false), 800);
      }
    }
  }, [isLoading, inView]);

  return (
    <div className={styles.section}>
      <div className={styles.inView} ref={ref}></div>
      <div
        className={`${styles.container} ${isKnown && styles.known} ${
          showSK && styles.sk
        } ${checkClassName}`}
      >
        {showSK && <Loading isTrailer={isTrailer || false} />}
        {children}
      </div>
    </div>
  );
};

export default FadeInOut;
