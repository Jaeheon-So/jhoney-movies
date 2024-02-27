import HomeSearchForm from "../_components/HomeSearchForm";
import PopluarSection from "../_components/PopluarSection";
import TrailerSection from "../_components/TrailerSection";
import TrendSection from "../_components/TrendSection";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <section className={styles.section1}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            <div className={styles.t1}>Welcome.</div>
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
    </>
  );
}
