import React from "react";
import VideoModal from "../../play/_component/VideoModal";

type Props = {
  searchParams: { k: string };
};

const InterceptPlayPage = ({ searchParams }: Props) => {
  return <VideoModal searchParams={searchParams} />;
};

export default InterceptPlayPage;
