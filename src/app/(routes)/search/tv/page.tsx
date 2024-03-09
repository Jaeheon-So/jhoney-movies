import { getSearchTv } from "@/lib/getSearchTv";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import SearchTv from "./_component/SearchTv";

export async function generateMetadata({ searchParams }: Props) {
  return {
    title: `${searchParams.q} - TV 검색 | JHONEYDB `,
    description: `${searchParams.q} TV 검색 결과`,
  };
}

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
