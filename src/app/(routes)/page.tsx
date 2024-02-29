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
            <div className={styles.t1}>Welcome to JHONEYDB.</div>
            <div className={styles.t2}>
              Millions of movies, TV shows and people to discover. Explore now.
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
