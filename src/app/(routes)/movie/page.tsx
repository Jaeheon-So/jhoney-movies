import React from "react";
import DiscoverPMovie from "./_component/DiscoverPMovie";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getDiscoverPMovie } from "@/app/_lib/getDiscoverPMovie";

type Props = {
  searchParams: { sort_by?: string; with_genres?: string };
};

const PopularMoviePage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["movies", "popular", "movie", searchParams],
    queryFn: getDiscoverPMovie,
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DiscoverPMovie searchParams={searchParams} />
    </HydrationBoundary>
  );
};

export default PopularMoviePage;
