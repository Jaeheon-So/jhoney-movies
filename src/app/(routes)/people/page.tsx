import React from "react";
import styles from "./page.module.scss";
import PopularPeopleList from "./_component/PopularPeopleList";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getPopularPeople } from "@/app/_lib/getPopularPeople";

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
