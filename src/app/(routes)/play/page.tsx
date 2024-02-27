import React from "react";
import VideoModal from "./_component/VideoModal";

type Props = {
  searchParams: { k: string };
};

const PlayPage = ({ searchParams }: Props) => {
  return <VideoModal searchParams={searchParams} />;
};

export default PlayPage;
