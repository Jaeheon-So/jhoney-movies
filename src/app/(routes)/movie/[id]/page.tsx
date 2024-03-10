import { getMovieDetail } from "@/lib/movie/getMovieDetail";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import MovieDetail from "./_component/MovieDetail";
import { getMovieCredit } from "@/lib/movie/getMovieCredit";
import { auth } from "@/auth";
import { getAllFavorList } from "@/lib/favor/getAllFavorList";
import { getMovieDetailServer } from "@/lib/movie/getMovieDetailServer";
import { MovieDetailResponse } from "@/model/Movie";

export async function generateMetadata({ params }: Props) {
  const detail: MovieDetailResponse = await getMovieDetailServer({
    queryKey: ["movies", "detail", "movie", params.id],
  });

  return {
    title: `${detail.title} | JHONEYDB `,
    description: `${detail.title} 상세 정보`,
  };
}

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
