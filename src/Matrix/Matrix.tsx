import React from "react";
import Toolbar from "./sections/Toolbar/Toolbar";
import DataGrid from "./sections/DataGrid/DataGrid";

const Matrix = () => {
  return (
    <div className="matrix">
      <Toolbar />
      <DataGrid />
    </div>
  );
};

export default Matrix;
