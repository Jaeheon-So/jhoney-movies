import { ReactNode } from "react";
import styles from "./layout.module.scss";

type Props = {
  children: ReactNode;
};

const MovieLayOut = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Popular Movies</div>
      {children}
    </div>
  );
};

export default MovieLayOut;
