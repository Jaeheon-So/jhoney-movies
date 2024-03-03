import { getTvCredit } from "@/app/_lib/getTvCredit";
import { getTvDetail } from "@/app/_lib/getTvDetail";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import TvDetail from "./_component/TvDetail";

type Props = {
  params: { id: string };
};

const TvDetailPage = async ({ params }: Props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["movies", "detail", "tv", params.id],
    queryFn: getTvDetail,
  });
  await queryClient.prefetchQuery({
    queryKey: ["movies", "credits", "tv", params.id],
    queryFn: getTvCredit,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <TvDetail id={params.id} />
    </HydrationBoundary>
  );
};

export default TvDetailPage;
