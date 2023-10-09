import { ColorValue } from "react-native";

export type SpinnerProps = {
    size?: number;
    color?: ColorValue;
};

export type SpinnerCircleProps = {
    index: number;
    totalCount: number;
    size: number;
    color: ColorValue;
};
