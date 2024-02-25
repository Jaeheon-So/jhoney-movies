import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const TvLayOut = ({ children }: Props) => {
  return (
    <div>
      TvLayout
      {children}
    </div>
  );
};

export default TvLayOut;
