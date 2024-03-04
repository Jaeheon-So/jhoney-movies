import { getSearchMovie } from "@/app/_lib/getSearchMovie";
import { getSearchPeople } from "@/app/_lib/getSearchPeople";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import SearchMovie from "./_component/SearchMovie";

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
    queryKey: ["people", "search", searchParams.q],
    queryFn: getSearchPeople,
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SearchMovie q={searchParams.q} />
    </HydrationBoundary>
  );
};

export default SearchMoviePage;
