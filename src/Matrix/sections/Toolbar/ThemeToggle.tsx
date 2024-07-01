import React from "react";
import { MatrixService } from "../../../services/MatrixService";
import {
  SAVED_PROPERTIES,
  SAVED_SECTIONS,
  THEME_VALUES,
} from "../../../constants/commonConstants";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function ThemeToggle() {
  const sectionData = MatrixService.properties[SAVED_SECTIONS.GENERAL] || {};
  const currentValue =
    sectionData[SAVED_PROPERTIES.THEME] || THEME_VALUES[0].value;
  const onToggle = (event) => {
    const {
      target: { value },
    } = event;
    MatrixService.persistProperties({
      property: SAVED_PROPERTIES.THEME,
      section: SAVED_SECTIONS.GENERAL,
      value,
    });
  };
  return (
    <div className="themeToggle toolBarOption">
      <div className="optionLabel">Theme Toggle:</div>
      <ToggleButtonGroup onChange={onToggle} value={currentValue}>
        {THEME_VALUES.map(({ label, value }) => (
          <ToggleButton value={value}>{label}</ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

export default ThemeToggle;
