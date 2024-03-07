import { auth } from "@/auth";
import React from "react";

const MyMoviePage = async () => {
  const session = await auth();

  return <div>MyMoviePage</div>;
};

export default MyMoviePage;
