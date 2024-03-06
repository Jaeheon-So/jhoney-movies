import { auth } from "@/auth";
import React from "react";

const MyMoviePage = async () => {
  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
};

export default MyMoviePage;
