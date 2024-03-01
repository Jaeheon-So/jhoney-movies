import React from "react";

type Props = {
  params: { id: string };
};

const PeopleDetailPage = ({ params }: Props) => {
  return <div>{params.id}</div>;
};

export default PeopleDetailPage;
