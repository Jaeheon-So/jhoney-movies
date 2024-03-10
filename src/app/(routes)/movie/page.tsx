import React from "react";
import DiscoverPMovie from "./_component/DiscoverPMovie";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getDiscoverPMovie } from "@/lib/movie/getDiscoverPMovie";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popular Movie | JHONEYDB",
  description: "유명한 영화를 탐색해보세요",
};

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
