import { ReactNode } from "react";
import styles from "./layout.module.scss";
import SortFilter from "./_component/SortFilter";

type Props = {
  children: ReactNode;
};

const MovieLayOut = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Popular Movies</div>
      <div className={styles.bottom}>
        <div className={styles.filterWrapper}>
          <SortFilter />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default MovieLayOut;
