import { getMovieDetail } from "@/app/_lib/getMovieDetail";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import MovieDetail from "./_component/MovieDetail";
import { getMovieCredit } from "@/app/_lib/getMovieCredit";
import { auth } from "@/auth";
import { getAllFavorList } from "@/app/_lib/getAllFavorList";

type Props = {
  params: { id: string };
};

const MovieDetailPage = async ({ params }: Props) => {
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["movies", "detail", "movie", params.id],
    queryFn: getMovieDetail,
  });
  await queryClient.prefetchQuery({
    queryKey: ["movies", "credits", "movie", params.id],
    queryFn: getMovieCredit,
  });
  await queryClient.prefetchQuery({
    queryKey: ["auth", "favor", session?.user?.id || ""],
    queryFn: getAllFavorList,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MovieDetail id={params.id} session={session} />
    </HydrationBoundary>
  );
};

export default MovieDetailPage;
