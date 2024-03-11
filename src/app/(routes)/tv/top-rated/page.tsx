import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import DiscoverTTv from "./_component/DiscoverTTv";
import { getDiscoverTTv } from "@/lib/tv/getDiscoverTTv";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Rated TV | HONEY-BOX",
  description: "평점 높은 TV 프로그램을 탐색해보세요",
};

type Props = {
  searchParams: { sort_by?: string; with_genres?: string };
};

const TopRatedTvPage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["movies", "top-rated", "tv", searchParams],
    queryFn: getDiscoverTTv,
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DiscoverTTv searchParams={searchParams} />;
    </HydrationBoundary>
  );
};

export default TopRatedTvPage;
