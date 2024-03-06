import { getTvCredit } from "@/app/_lib/getTvCredit";
import { getTvDetail } from "@/app/_lib/getTvDetail";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import TvDetail from "./_component/TvDetail";
import { auth } from "@/auth";
import { getAllFavorList } from "@/app/_lib/getAllFavorList";

type Props = {
  params: { id: string };
};

const TvDetailPage = async ({ params }: Props) => {
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["movies", "detail", "tv", params.id],
    queryFn: getTvDetail,
  });
  await queryClient.prefetchQuery({
    queryKey: ["movies", "credits", "tv", params.id],
    queryFn: getTvCredit,
  });
  await queryClient.prefetchQuery({
    queryKey: ["auth", "favor", session?.user?.id || ""],
    queryFn: getAllFavorList,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <TvDetail id={params.id} session={session} />
    </HydrationBoundary>
  );
};

export default TvDetailPage;
