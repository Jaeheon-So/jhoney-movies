import { ReactNode, Suspense } from "react";
import styles from "./layout.module.scss";
import Navbar from "./_component/Navbar";
import LoadingCircle from "@/app/_components/LoadingCircle";

type Props = {
  children: ReactNode;
};

const SearchLayOut = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Suspense
        fallback={
          <div className={styles.loadingWrapper}>
            <LoadingCircle />
          </div>
        }
      >
        <Navbar />
      </Suspense>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default SearchLayOut;
