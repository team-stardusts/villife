export type ColorScheme = "light" | "dark";

export type ColorFamily = {
    blue: string;
    lightblue: string;
    lightgrey: string;
    grey: string;
    darkgrey: string;
    green: string;
    red: string;
    white: string;
    black: string;
};

export type FontFamilies = {
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
    fontFamilies: FontFamilies;
    researved: ResearvedFonts;
};
