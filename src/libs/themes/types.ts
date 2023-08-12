import { ColorValue } from "react-native";

export type ColorScheme = "light" | "dark";

export type ColorFamily = {
    specified: SpecifiedColor;
    status: StatusColor;
    series: ColorSeriesSet;
};

export type SpecifiedColor = {
    blue: ColorValue;
    lightblue: ColorValue;
    lightgrey: ColorValue;
    grey: ColorValue;
    darkgrey: ColorValue;
    green: ColorValue;
    red: ColorValue;
    white: ColorValue;
    black: ColorValue;
};

export type StatusColor = {
    primary: ColorValue;
    secondary: ColorValue;
    success: ColorValue;
    danger: ColorValue;
    warning: ColorValue;
    info: ColorValue;
};

export type ColorSeriesSet = {
    grey: ColorSeries;
};

export type ColorSeries = {
    level0: ColorValue;
    level1: ColorValue;
    level2: ColorValue;
    level3: ColorValue;
    level4: ColorValue;
    level5: ColorValue;
    level6: ColorValue;
    level7: ColorValue;
    level8: ColorValue;
    level9: ColorValue;
};

export type FontFamily = {
    [key: string]: {
        default: string;
        [key: string]: string;
    };
};

export type ResearvedFonts = {
    [key: string]: {
        fontFamily: string;
        fontsize: number;
    };
};

export type Font = {
    fontFamilies: FontFamily;
    researved: ResearvedFonts;
};
