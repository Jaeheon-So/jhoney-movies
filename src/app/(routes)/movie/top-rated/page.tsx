import React from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import DiscoverTMovie from "./_components/DiscoverTMovie";
import { getDiscoverTMovie } from "@/app/_lib/getDiscoverTMovie";

type Props = {
  searchParams: { sort_by?: string; with_genres?: string };
};

const TopRatedMoviePage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["movies", "top-rated", "movies", searchParams],
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
