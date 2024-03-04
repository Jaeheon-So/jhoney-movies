import { getSearchMovie } from "@/app/_lib/getSearchMovie";
import { getSearchPeople } from "@/app/_lib/getSearchPeople";
import { getSearchTv } from "@/app/_lib/getSearchTv";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";

type Props = {
  searchParams: { q: string };
};

const SearchMoviePage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["movies", "search", "movie", searchParams.q],
    queryFn: getSearchMovie,
    initialPageParam: 1,
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["movies", "search", "tv", searchParams.q],
    queryFn: getSearchTv,
    initialPageParam: 1,
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["people", "search", searchParams.q],
    queryFn: getSearchPeople,
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      SearchMoviePage
    </HydrationBoundary>
  );
};

export default SearchMoviePage;
