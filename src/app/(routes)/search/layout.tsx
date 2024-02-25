import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SearchLayOut = ({ children }: Props) => {
  return (
    <div>
      SearchLayout
      {children}
    </div>
  );
};

export default SearchLayOut;
