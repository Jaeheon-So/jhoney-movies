import { getPeopleDetail } from "@/app/_lib/getPeopleDetail";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import PeopleDetail from "./_component/PeopleDetail";
import { getPeopleSns } from "@/app/_lib/getPeopleSns";
import { getSearchPeople } from "@/app/_lib/getSearchPeople";
import { getCombinedCredit } from "@/app/_lib/getCombinedCredit";

type Props = {
  params: { id: string };
};

const PeopleDetailPage = async ({ params }: Props) => {
  const id = params.id.split("-")[0];
  const name = params.id.split("-").slice(1).join("-");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["people", "detail", id],
    queryFn: getPeopleDetail,
  });
  await queryClient.prefetchQuery({
    queryKey: ["people", "sns", id],
    queryFn: getPeopleSns,
  });
  await queryClient.prefetchQuery({
    queryKey: ["people", "search", name],
    queryFn: getSearchPeople,
  });
  await queryClient.prefetchQuery({
    queryKey: ["people", "credit", id],
    queryFn: getCombinedCredit,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <PeopleDetail id={id} name={name} />
    </HydrationBoundary>
  );
};

export default PeopleDetailPage;
