import { getSearchMovie } from "@/lib/movie/getSearchMovie";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import SearchMovie from "./_component/SearchMovie";

export async function generateMetadata({ searchParams }: Props) {
  return {
    title: `${searchParams.q} - 영화 검색 | HONEY-BOX`,
    description: `${searchParams.q} 영화 검색 결과`,
  };
}

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
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SearchMovie q={searchParams.q} />
    </HydrationBoundary>
  );
};

export default SearchMoviePage;
