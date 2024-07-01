import React from "react";
import { MatrixService } from "../../../services/MatrixService";

function GridValues({ theme }) {
  const { rowValues, columnValues, measure } = MatrixService.metaData;
  const { flatDataRowMapping } = MatrixService.formattedData;
  console.log(flatDataRowMapping);
  // if (Object.keys(measure)?.length === 0) return null;
  return (
    <div className="gridValues">
      <div>
        {rowValues.map((row, index) => (
          <div
            className={`gridRow ${theme}-theme`}
            style={{ borderTop: index !== 0 ? "2px solid black" : "" }}
          >
            <div className="gridCell">{row.value || "(Unknown)"}</div>
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
                      className={`gridCell ${theme}-theme`}
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
                      className={`gridCell ${theme}-theme`}
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
