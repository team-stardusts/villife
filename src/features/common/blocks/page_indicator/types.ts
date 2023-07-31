import { ColorValue } from "react-native";

export type PageIndicatorsProps = {
    length: number;
    currentIndex: PageIndicatorsProps["length"];
    size: number;
    activeColor: ColorValue;
    deactiveColor: ColorValue;
};

export type IndicatorProps = {
    isOn: boolean;
    size: PageIndicatorsProps["size"];
    activeColor: ColorValue;
    deactiveColor: ColorValue;
};
