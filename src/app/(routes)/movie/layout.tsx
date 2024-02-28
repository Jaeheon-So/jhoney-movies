import { ReactNode } from "react";
import styles from "./layout.module.scss";
import Filters from "./_component/Filters";
import Title from "./_component/Title";

type Props = {
  children: ReactNode;
};

const MovieLayOut = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Title />
      <div className={styles.bottom}>
        <Filters />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default MovieLayOut;
