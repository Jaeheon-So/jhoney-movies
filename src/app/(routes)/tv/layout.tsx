import { ReactNode } from "react";
import styles from "./layout.module.scss";
import Title from "./_component/Title";
import Filters from "./_component/Filters";

type Props = {
  children: ReactNode;
};

const TvLayOut = ({ children }: Props) => {
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

export default TvLayOut;
