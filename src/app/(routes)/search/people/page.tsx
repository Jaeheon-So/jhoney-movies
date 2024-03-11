import { getSearchPeople } from "@/lib/people/getSearchPeople";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import SearchPeople from "./_component/SearchPeople";

export async function generateMetadata({ searchParams }: Props) {
  return {
    title: `${searchParams.q} - 인물 검색 | HONEY-BOX`,
    description: `${searchParams.q} 인물 검색 결과`,
  };
}

type Props = {
  searchParams: { q: string };
};

const SearchPersonPage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["people", "search", searchParams.q],
    queryFn: getSearchPeople,
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SearchPeople q={searchParams.q} />
    </HydrationBoundary>
  );
};

export default SearchPersonPage;
