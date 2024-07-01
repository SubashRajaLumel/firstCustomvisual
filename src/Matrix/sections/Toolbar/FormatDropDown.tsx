import React from "react";
import {
  FORMAT_OPTIONS,
  SAVED_PROPERTIES,
  SAVED_SECTIONS,
} from "../../../constants/commonConstants";
import { MenuItem, Select } from "@mui/material";
import { MatrixService } from "../../../services/MatrixService";

const FormatDropDown = () => {
  const sectionData = MatrixService.properties[SAVED_SECTIONS.GENERAL] || {};
  const currentValue =
    sectionData[SAVED_PROPERTIES.FORMAT_OPTION] || FORMAT_OPTIONS[0].value;
  const onFormatOptionChange = (event) => {
    const {
      target: { value },
    } = event;
    MatrixService.persistProperties({
      property: SAVED_PROPERTIES.FORMAT_OPTION,
      section: SAVED_SECTIONS.GENERAL,
      value,
    });
  };
  return (
    <div>
      <div className="optionLabel">Formatting Options:</div>
      <Select
        value={currentValue}
        id="formatOptions"
        className="formatOption toolBarOption"
        onChange={onFormatOptionChange}
      >
        {FORMAT_OPTIONS.map((opt) => (
          <MenuItem value={opt.value}>{opt.label}</MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default FormatDropDown;
