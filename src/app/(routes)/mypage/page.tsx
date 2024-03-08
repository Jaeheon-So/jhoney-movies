import { getAllFavorList } from "@/app/_lib/getAllFavorList";
import { auth } from "@/auth";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import React from "react";

const MyMoviePage = async () => {
  const session = await auth();
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["auth", "favor", session?.user?.id || ""],
  //   queryFn: getAllFavorList,
  // });
  // const dehydratedState = dehydrate(queryClient);

  return <div>MyMoviePage</div>;
};

export default MyMoviePage;
