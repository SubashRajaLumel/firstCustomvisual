import React from "react";
import { MatrixService } from "../../../services/MatrixService";
import { getArrayOfObjAsObj } from "../../../utils/commonUtils";
import {
  FORMAT_OPTIONS,
  SAVED_PROPERTIES,
  SAVED_SECTIONS,
} from "../../../constants/commonConstants";

function GridHeader({ theme }) {
  const { columnValues, row, measure = {} } = MatrixService.metaData;
  const sectionData = MatrixService.properties[SAVED_SECTIONS.GENERAL] || {};
  const formatOption =
    sectionData[SAVED_PROPERTIES.FORMAT_OPTION] || FORMAT_OPTIONS[0].value;
  const formatOptionMap = getArrayOfObjAsObj(FORMAT_OPTIONS, "value");
  return (
    <div className="gridHeader">
      <div
        className={`columnHeader gridRow ${theme}-theme`}
        style={{ borderBottom: "2px solid black" }}
      >
        <div className="gridCell">{row.displayName}</div>
        {columnValues.length !== 0 ? (
          columnValues.map(({ value }) => (
            <div
              className={`gridCell ${theme}-theme`}
              style={{ borderLeft: "2px solid black" }}
            >
              {value}
              <div style={{ fontSize: "14px" }}>
                {formatOptionMap[formatOption]?.label}
              </div>
            </div>
          ))
        ) : (
          <div
            className={`gridCell ${theme}-theme`}
            style={{ borderLeft: "2px solid black" }}
          >
            {measure?.displayName}
          </div>
        )}
      </div>

      {/* {Object.keys(measure)?.length !== 0 ? (
        <div
          className={`measureHeader gridRow ${theme}-theme`}
          style={{ borderBottom: "2px solid black" }}
        >
          <div className="gridCell">{row.displayName}</div>
          {(columnValues.length ? columnValues : [measure]).map(() => (
            <div
              className={`gridCell ${theme}-theme`}
              style={{ borderLeft: "2px solid black" }}
            >
              <div className="measureHeaderCell">
                <div>{measure.displayName}</div>
              </div>
            </div>
          ))}
        </div>
      ) : null} */}
    </div>
  );
}

export default GridHeader;
