import React from "react";
import VideoModal from "./_component/VideoModal";
import Home from "../page";

type Props = {
  searchParams: { k: string };
};

const PlayPage = ({ searchParams }: Props) => {
  return (
    <>
      <VideoModal searchParams={searchParams} />;
      <Home />
    </>
  );
};

export default PlayPage;
