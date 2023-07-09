import { ColorValue } from "react-native";

export type TimePickerTime = {
    hour: number | null;
    minute: number | null;
};

export type TimePickerProps = {
    height: number;
    initialTime?: TimePickerTime;
    focusedcolor?: ColorValue;
    unFocusedColor?: ColorValue;
    onTimeChange?(time: TimePickerTime): void;
};
