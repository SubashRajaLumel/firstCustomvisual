import React from "react";
import ThemeToggle from "./ThemeToggle";
import FormatDropDown from "./FormatDropDown";

function Toolbar() {
  return (
    <div className="toolBar">
      <ThemeToggle />
      <FormatDropDown />
    </div>
  );
}

export default Toolbar;
