import { getSearchMovie } from "@/lib/getSearchMovie";
import { getSearchPeople } from "@/lib/getSearchPeople";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import { getSearchTv } from "@/lib/getSearchTv";
import RedirectSearch from "./_component/RedirectSearch";

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
      <RedirectSearch q={searchParams.q} />
    </HydrationBoundary>
  );
};

export default SearchMoviePage;
