import powerbi from "powerbi-visuals-api";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
interface IProperties {
    theme?: string;
    formatOption?: string;
}
export declare class MatrixService {
    static options: VisualUpdateOptions;
    static host: IVisualHost;
    static properties: IProperties;
    static dataView: powerbi.DataView;
    static dataRows: any;
    static flatDataRowMapping: any;
    static formattedData: any;
    static metaData: any;
    static persistProperties(changes: any): void;
    static getPersistedProperties(): void;
    static collectData(): void;
    static collectSingleColumn(): void;
    static collectMeasure(): void;
    static getDataKey(row: any, column: any, measure: any): string;
    static collectDataRows(): void;
    static collectFormattedData(): void;
}
export {};
