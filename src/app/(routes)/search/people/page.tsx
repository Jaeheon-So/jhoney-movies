import { getSearchPeople } from "@/app/_lib/getSearchPeople";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import SearchPeople from "./_component/SearchPeople";

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
