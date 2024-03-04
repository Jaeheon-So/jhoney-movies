import { getSearchTv } from "@/app/_lib/getSearchTv";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import SearchTv from "./_component/SearchTv";

type Props = {
  searchParams: { q: string };
};

const SearchTvPage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["movies", "search", "tv", searchParams.q],
    queryFn: getSearchTv,
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SearchTv q={searchParams.q} />
    </HydrationBoundary>
  );
};

export default SearchTvPage;
