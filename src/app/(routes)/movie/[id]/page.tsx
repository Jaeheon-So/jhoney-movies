import { getMovieDetail } from "@/app/_lib/getMovieDetail";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import MovieDetail from "./_component/MovieDetail";

type Props = {
  params: { id: string };
};

const MovieDetailPage = async ({ params }: Props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["movies", "detail", "movie", params.id],
    queryFn: getMovieDetail,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MovieDetail id={params.id} />
    </HydrationBoundary>
  );
};

export default MovieDetailPage;
