import React from "react";
import styles from "./page.module.scss";
import PopularPeopleList from "./_component/PopularPeopleList";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getPopularPeople } from "@/lib/people/getPopularPeople";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popular People | HONEY-BOX",
  description: "유명한 인물을 탐색해보세요",
};

const PopularPeoplePage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["people", "popular"],
    queryFn: getPopularPeople,
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Popular People</div>
      <div>
        <HydrationBoundary state={dehydratedState}>
          <PopularPeopleList />
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default PopularPeoplePage;
