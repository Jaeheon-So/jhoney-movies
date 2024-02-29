import { QueryFunction, useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const useInfiniteScroll = (
  queryKey: any,
  queryFn: QueryFunction<any, any, number>
) => {
  const { data, isFetching, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: queryKey,
      queryFn: queryFn,
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => pages.length + 1,
      staleTime: 60 * 1000 * 5,
      gcTime: 60 * 1000 * 5,
    });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 50,
  });

  useEffect(() => {
    if (inView) {
      console.log(data?.pages[0].total_pages);

      if (Number(data?.pages[0].total_pages) <= Number(data?.pageParams.at(-1)))
        return;
      !isFetching && !isLoading && hasNextPage && fetchNextPage();
    }
  }, [inView]);

  return { ref, data, isFetching, isLoading, hasNextPage, fetchNextPage };
};

export default useInfiniteScroll;
