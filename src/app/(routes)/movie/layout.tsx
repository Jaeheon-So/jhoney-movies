import { ReactNode } from "react";
import styles from "./layout.module.scss";
import Filters from "./_component/Filters";

type Props = {
  children: ReactNode;
};

const MovieLayOut = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Popular Movies</div>
      <div className={styles.bottom}>
        <Filters />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default MovieLayOut;
