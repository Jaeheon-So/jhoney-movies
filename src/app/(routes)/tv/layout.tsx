import { ReactNode, Suspense } from "react";
import styles from "./layout.module.scss";
import Title from "./_component/Title";
import Filters from "./_component/Filters";
import Container from "./_component/Container";
import Bottom from "./_component/Bottom";

type Props = {
  children: ReactNode;
};

const TvLayOut = ({ children }: Props) => {
  return (
    <Container>
      <Title />
      <Bottom>
        <Suspense>
          <Filters />
        </Suspense>
        <div className={styles.content}>{children}</div>
      </Bottom>
    </Container>
  );
};

export default TvLayOut;
