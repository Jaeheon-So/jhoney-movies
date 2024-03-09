import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import HomeSearchForm from "../_components/HomeSearchForm";
import PopluarSection from "../_components/PopluarSection";
import TrailerSection from "../_components/TrailerSection";
import TrendSection from "../_components/TrendSection";
import styles from "./page.module.scss";
import { getTrendMovies } from "../_lib/getTrendMovies";
import { getPopularMovies } from "../_lib/getPopularMovies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "홈 | JHONEYDB",
  description: "영화, TV 프로그램, 인물을 탐색해보세요",
};

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["movies", "trend", "day"],
    queryFn: getTrendMovies,
  });
  await queryClient.prefetchQuery({
    queryKey: ["movies", "popular", "movie"],
    queryFn: getPopularMovies,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <section className={styles.section1}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            <div className={styles.t1}>JHONEYDB에 오신 걸 환영합니다.</div>
            <div className={styles.t2}>
              수백만 개의 영화, TV 프로그램, 인물들을 지금 만나보세요.
            </div>
          </div>
          <HomeSearchForm />
        </div>
      </section>
      <TrendSection />
      <TrailerSection />
      <PopluarSection />
    </HydrationBoundary>
  );
}
