import { ColorValue } from "react-native";

export type NumberPickerProps = {
    height: number;
    numbers: number[];
    initialIndex?: number;
    focusedcolor?: ColorValue;
    unFocusedColor?: ColorValue;
    onNumberChange?(number: number): void;
};
