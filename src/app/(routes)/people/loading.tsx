import LoadingCircle from "@/app/_components/LoadingCircle";
import React from "react";

const loading = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingCircle />
    </div>
  );
};

export default loading;
