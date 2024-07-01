import powerbi from "powerbi-visuals-api";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import {
  FORMAT_VALUES,
  KEY_SEPERATOR,
  SAVED_SECTIONS,
} from "../constants/commonConstants";

interface IProperties {
  theme?: string;
  formatOption?: string;
}
export class MatrixService {
  static options: VisualUpdateOptions;
  static host: IVisualHost;
  static properties: IProperties = {};
  static dataView: powerbi.DataView;
  static dataRows: any = [];
  static flatDataRowMapping: any = {};
  static formattedData: any = {};
  static metaData: any = {
    column: {},
    columnValues: [],
    row: {},
    rowValues: [],
    measure: {},
  };
  static persistProperties(changes) {
    const { section, property, value } = changes;
    MatrixService.host.persistProperties({
      merge: [
        {
          objectName: section,
          selector: null,
          properties: {
            [property]: value,
          },
        },
      ],
    });
  }

  static getPersistedProperties() {
    this.dataView = this.options.dataViews[0];
    const {
      metadata: { objects },
    } = this.dataView;
    if (!objects) return;
    Object.keys(objects).forEach((obj) => {
      this.properties[obj] = objects[obj];
    });
  }

  static collectData() {
    this.collectSingleColumn();
    this.collectMeasure();
    this.collectDataRows();
    this.collectFormattedData();
  }

  // static collectColumnValues() {
  //   this.metaData.columns = [];
  //   this.metaData.columnValues = [];
  //   this.dataView.matrix.columns.levels.forEach((cols, index) => {
  //     const sources = cols.sources[0];
  //     const { roles, queryName, displayName } = sources;
  //     if (roles.columns) {
  //       this.metaData.columnMeta[queryName] = {
  //         displayName,
  //         level: index,
  //       };
  //       this.metaData.columns.push({
  //         level: index,
  //         queryName,
  //         displayName,
  //       });
  //     }
  //   });
  // }

  static collectSingleColumn() {
    this.metaData.columnValues = [];
    this.metaData.column = this.dataView.matrix.columns.levels[0].sources[0];
    this.dataView.matrix.columns.root.children.forEach((col) => {
      if (col.value) {
        this.metaData.columnValues.push({
          ...col,
          columnQueryName: this.metaData.column.queryName,
          columnDisplayName: this.metaData.column.displayName,
        });
      }
    });
  }

  static collectMeasure() {
    this.metaData.measure = this.dataView.matrix.valueSources[0];
  }

  static getDataKey(row, column, measure) {
    let key = "";
    if (row) {
      key = key.concat(row);
    }
    if (column) {
      key = key.concat(`${KEY_SEPERATOR}${column}`);
    }
    if (measure) {
      key = key.concat(`${KEY_SEPERATOR}${measure}`);
    }
    return key;
  }

  static collectDataRows() {
    this.metaData.row = this.dataView.matrix.rows.levels[0].sources[0];
    this.metaData.rowValues = [];
    this.dataRows = [];
    this.flatDataRowMapping = {};

    this.dataView.matrix.rows.root.children.forEach((row) => {
      this.metaData.rowValues.push({
        ...row,
        rowQueryName: this.metaData.row.queryName,
        rowDisplayName: this.metaData.row.displayName,
      });
      if (!row.values) return;
      Object.keys(row.values).forEach((val) => {
        this.dataRows.push({
          row: row.value,
          column: this.metaData.columnValues[val]?.value || "",
          data: row.values[val].value,
        });
        const dataKey = this.getDataKey(
          row?.value,
          this.metaData.columnValues[val]?.value,
          this.metaData.measure?.queryName
        );
        this.flatDataRowMapping[dataKey] = row.values[val];
      });
    });
  }

  static collectFormattedData() {
    this.formattedData = {
      dataRows: [],
      flatDataRowMapping: {},
    };
    const { formatOption } = this.properties[SAVED_SECTIONS.GENERAL];
    const formatValue = FORMAT_VALUES[formatOption];

    this.dataRows.forEach((dataRow) => {
      const formattedValue = dataRow.data / formatValue;
      this.formattedData.dataRows.push({
        ...dataRow,
        value: formattedValue,
      });
      const dataKey = this.getDataKey(
        dataRow.row,
        dataRow.column,
        this.metaData.measure?.queryName
      );
      this.formattedData.flatDataRowMapping[dataKey] = formattedValue;
    });
  }
}
