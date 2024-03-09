import { getAllFavorList } from "@/app/_lib/getAllFavorList";
import { auth } from "@/auth";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import FavorTv from "./_component/FavorTv";

export async function generateMetadata() {
  const session = await auth();

  return {
    title: `${
      session?.user?.image ? session?.user?.name : session?.user?.email
    } - TV 관심 목록 | JHONEYDB `,
    description: `TV 관심 목록`,
  };
}

const MyTvPage = async () => {
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["auth", "favor", session?.user?.id || ""],
    queryFn: getAllFavorList,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <FavorTv session={session} />
    </HydrationBoundary>
  );
};

export default MyTvPage;
