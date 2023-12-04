import { ColorValue } from "react-native";

export type PalletProps = {
    onSelection(color: ColorValue): void;
};

export type ColorAvailable = "blue" | "red" | "yellow" | "green" | "grey";
