import React from "react";
import GridHeader from "./GridHeader";
import GridValues from "./GridValues";
import { MatrixService } from "../../../services/MatrixService";
import {
  SAVED_PROPERTIES,
  SAVED_SECTIONS,
  THEME_VALUES,
} from "../../../constants/commonConstants";

function DataGrid() {
  const sectionData = MatrixService.properties[SAVED_SECTIONS.GENERAL] || {};
  const theme = sectionData[SAVED_PROPERTIES.THEME] || THEME_VALUES[0].value;
  return (
    <div className={`datagrid ${theme}-theme`}>
      <div className={`gridTable ${theme}-theme`}>
        <GridHeader theme={theme} />
        <GridValues theme={theme} />
      </div>
    </div>
  );
}

export default DataGrid;
