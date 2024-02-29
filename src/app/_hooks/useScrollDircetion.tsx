"use client";

import { useCallback, useEffect, useState } from "react";

export const throttleHelper = (callback: () => void, waitTime: number) => {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timerId) return;

    timerId = setTimeout(() => {
      callback();
      timerId = null;
    }, waitTime);
  };
};

const useScrollDirection = () => {
  const [isUp, setIsUp] = useState(false);
  const [pageY, setPageY] = useState(0);
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = useCallback(() => {
    const {
      scrollY,
      document: {
        documentElement: { scrollHeight, clientHeight },
      },
    } = window;

    const deltaY = scrollY - pageY;
    const isUp = scrollY !== 0 && deltaY >= 0 && scrollY > 64;
    const isBottom = scrollHeight - scrollY - clientHeight === 0;

    setIsUp(isUp);
    setPageY(scrollY);
    setIsBottom(isBottom);
  }, [pageY, setIsUp, setPageY, setIsBottom]);

  const throttleScroll = throttleHelper(handleScroll, 50);

  useEffect(() => {
    document.addEventListener("scroll", throttleScroll);
    return () => document.removeEventListener("scroll", throttleScroll);
  }, [throttleScroll]);

  return { isUp, isBottom, pageY };
};

export default useScrollDirection;
