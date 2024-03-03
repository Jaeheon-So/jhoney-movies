import { ReactNode, Suspense } from "react";
import styles from "./layout.module.scss";
import Filters from "./_component/Filters";
import Title from "./_component/Title";
import Bottom from "./_component/Bottom";
import Container from "./_component/Container";

type Props = {
  children: ReactNode;
};

const MovieLayOut = ({ children }: Props) => {
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

export default MovieLayOut;
