import { getTvCredit } from "@/lib/tv/getTvCredit";
import { getTvDetail } from "@/lib/tv/getTvDetail";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import TvDetail from "./_component/TvDetail";
import { auth } from "@/auth";
import { getAllFavorList } from "@/lib/favor/getAllFavorList";
import { TvDetailResponse } from "@/model/Movie";
import { getTvDetailServer } from "@/lib/tv/getTvDetailServer";

export async function generateMetadata({ params }: Props) {
  const detail: TvDetailResponse = await getTvDetailServer({
    queryKey: ["movies", "detail", "tv", params.id],
  });

  return {
    title: `${detail.name} | HONEY-BOX`,
    description: `${detail.name} 상세 정보`,
  };
}

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
