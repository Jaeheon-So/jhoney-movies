import { getDiscoverPTv } from "@/app/_lib/getDiscoverPTv";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import DiscoverPTv from "./_component/DiscoverPTv";

type Props = {
  searchParams: { sort_by?: string; with_genres?: string };
};

const PopularTvPage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["movies", "popular", "tv", searchParams],
    queryFn: getDiscoverPTv,
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DiscoverPTv searchParams={searchParams} />;
    </HydrationBoundary>
  );
};

export default PopularTvPage;
