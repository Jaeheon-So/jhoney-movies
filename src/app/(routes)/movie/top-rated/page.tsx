import React from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import DiscoverTMovie from "./_components/DiscoverTMovie";
import { getDiscoverTMovie } from "@/lib/movie/getDiscoverTMovie";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Rated Movie | HONEY-BOX",
  description: "평점 높은 영화를 탐색해보세요",
};

type Props = {
  searchParams: { sort_by?: string; with_genres?: string };
};

const TopRatedMoviePage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["movies", "top-rated", "movie", searchParams],
    queryFn: getDiscoverTMovie,
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DiscoverTMovie searchParams={searchParams} />;
    </HydrationBoundary>
  );
};

export default TopRatedMoviePage;
