import { getAllFavorList } from "@/app/_lib/getAllFavorList";
import { auth } from "@/auth";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import FavorMovie from "./_component/FavorMovie";

const MyMoviePage = async () => {
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["auth", "favor", session?.user?.id || ""],
    queryFn: getAllFavorList,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <FavorMovie session={session} />
    </HydrationBoundary>
  );
};

export default MyMoviePage;
