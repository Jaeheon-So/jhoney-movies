import { ReactNode } from "react";
import styles from "./layout.module.scss";
import Navbar from "./_component/Navbar";

type Props = {
  children: ReactNode;
};

const SearchLayOut = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default SearchLayOut;
