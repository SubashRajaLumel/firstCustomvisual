import React, { useState } from "react";
import { MatrixService } from "../../../services/MatrixService";

function GridValues({ theme }) {
  const { rowValues, columnValues, measure } = MatrixService.metaData;
  const { flatDataRowMapping } = MatrixService.formattedData;
  const [selectedRow, setSelectedRow] = useState(null);
  // if (Object.keys(measure)?.length === 0) return null;

  const onRowSelect = (row) => {
    MatrixService.updateSelection(row);
    if (row.value === selectedRow) setSelectedRow(null);
    else setSelectedRow(row.value);
  };
  return (
    <div className="gridValues">
      <div>
        {rowValues.map((row, index) => (
          <div
            className={`gridRow ${theme}-theme ${
              selectedRow === row?.value ? "selectedRow" : ""
            }`}
            style={{ borderTop: index !== 0 ? "2px solid black" : "" }}
          >
            <div className="gridCell" onClick={() => onRowSelect(row)}>
              {row.value || "(Unknown)"}
            </div>
            {columnValues.length !== 0
              ? columnValues.map((col) => {
                  const key = MatrixService.getDataKey(
                    row?.value,
                    col?.value,
                    measure.queryName
                  );
                  const data = flatDataRowMapping[key];
                  return (
                    <div
                      className={`gridCell ${theme}-theme ${
                        selectedRow === row?.value ? "selectedRow" : ""
                      }`}
                      style={{ borderLeft: "2px solid black" }}
                    >
                      {data || ""}
                    </div>
                  );
                })
              : [measure].map(() => {
                  const key = MatrixService.getDataKey(
                    row?.value,
                    "",
                    measure.queryName
                  );
                  const data = flatDataRowMapping[key];
                  return (
                    <div
                      className={`gridCell ${theme}-theme ${
                        selectedRow === row?.value ? "selectedRow" : ""
                      }`}
                      style={{ borderLeft: "2px solid black" }}
                    >
                      {data || ""}
                    </div>
                  );
                })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GridValues;
