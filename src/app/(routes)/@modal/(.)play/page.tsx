import React from "react";
import VideoModal from "../../play/_component/VideoModal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "예고편 | JHONEYDB",
  description: "예고편을 감삼해보세요",
};

type Props = {
  searchParams: { k: string };
};

const InterceptPlayPage = ({ searchParams }: Props) => {
  return <VideoModal searchParams={searchParams} />;
};

export default InterceptPlayPage;
