import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MovieLayOut = ({ children }: Props) => {
  return (
    <div>
      MovieLayout
      {children}
    </div>
  );
};

export default MovieLayOut;
