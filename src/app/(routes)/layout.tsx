import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

const RouteLayout = ({ children, modal }: Props) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default RouteLayout;
