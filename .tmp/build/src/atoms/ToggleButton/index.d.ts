import React from "react";
import { ITheme } from "../../constants/types";
type MatrixProps = {
    classname?: string;
    fontColor?: string;
    color?: string;
    values: ITheme[];
    onToggle: any;
    selectedValue: string;
};
declare const ToggleButton: React.FC<MatrixProps>;
export default ToggleButton;
