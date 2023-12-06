import { ColorValue } from "react-native";

export type MemoPalletProps = {
    onSelection(color: MemoColor): void;
};

export type ColorAvailable = "blue" | "red" | "yellow" | "green" | "grey";

export type Pallet = {
    [key in ColorAvailable]: MemoColor;
} & {
    blue: MemoColor;
    green: MemoColor;
    grey: MemoColor;
    red: MemoColor;
    yellow: MemoColor;
};

export type MemoColor = {
    name: ColorAvailable;
    background: ColorValue;
    cursor: ColorValue;
    font: ColorValue;
};
