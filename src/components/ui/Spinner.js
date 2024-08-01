import { CircularProgress } from "@mui/material";
import React from "react";

const Spinner = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <CircularProgress />
    </div>
  );
};

export default Spinner;
