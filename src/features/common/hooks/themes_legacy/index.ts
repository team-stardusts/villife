import ThemeTypes from "./types";

export class LightTheme implements ThemeTypes.ITheme {
    readonly colors = {
        pallet: undefined,
        colorFamily: {
            black: "#000000",
            blue: "#0B75F2",
            darkgrey: "#3B3C3D",
            green: "#ACEC22",
            grey: "#7C7C7C",
            lightblue: "#539CF1",
            lightgrey: "#D9D9D9",
            red: "#EC2222",
            white: "#FFFFFF",
        },
    };

    readonly fonts = {
        title1: {
            fortFamily: "Pretendard-ExtraBold",
            fontSize: 26,
        },
        title2: {
            fortFamily: "Pretendard-Bold",
            fontSize: 18,
        },
        body1: {
            fortFamily: "Pretendard-Bold",
            fontSize: 16,
        },
        body2: {
            fortFamily: "Pretendard-Bold",
            fontSize: 14,
        },
        subTitle1: {
            fortFamily: "Pretendard-Regular",
            fontSize: 14,
        },
        caption1: {
            fortFamily: "Pretendard-Bold",
            fontSize: 12,
        },
        caption2: {
            fortFamily: "Pretendard-bold",
            fontSize: 10,
        },
        caption3: {
            fortFamily: "Pretendard-Regular",
            fontSize: 10,
        },
    };
}

/*
export class DarkTheme implements ThemeTypes.ITheme {
    readonly colors = {
        pallet: undefined,
        colorFamily: {
            black: "#000000",
            blue: "orange",
            darkgrey: "#3B3C3D",
            green: "#ACEC22",
            grey: "#7C7C7C",
            lightblue: "#539CF1",
            lightgrey: "#D9D9D9",
            red: "#EC2222",
            white: "#FFFFFF",
        }
    };
    readonly css = {
        font: {
            universial: {
                fontFamily: "pretendard",
            }
        }
    }
}
*/

//export class DarkTheme implements ThemeTypes.ITheme{
//}
export default class AppThemes implements ThemeTypes.IThemes {
    readonly LightTheme = new LightTheme();
    readonly DarkTheme = new LightTheme();
}
