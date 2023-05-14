import { ColorValue } from "react-native";

export type TimePickerTime = {
    hour: number;
    minute: number;
};

export type TimePickerProps = {
    height: number;
    initialTime?: TimePickerTime;
    focusedcolor?: ColorValue;
    unFocusedColor?: ColorValue;
    onTimeChange?(time: TimePickerTime): void;
};
