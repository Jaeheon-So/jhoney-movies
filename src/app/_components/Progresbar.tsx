"use client";

import React from "react";
import { AppProgressBar } from "next-nprogress-bar";

const Progressbar = () => {
  return (
    <AppProgressBar
      height="4px"
      color="#1cceb5"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default Progressbar;
