import ThemeCommon from "../absc";
import { ColorFamily, ColorScheme } from "../types";

class LightTheme extends ThemeCommon {
    readonly scheme: ColorScheme = "light";
    readonly color: ColorFamily = {
        specified: {
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
        status: {
            primary: "#0B75F2",
            secondary: "#D9D9D9",
            success: "#3ec13c",
            danger: "#f13737",
            warning: "#f3bb1a",
            info: "#539CF1",
        },
        series: {
            blue: {
                level0: "#E3F2FD",
                level1: "#BBDEFB",
                level2: "#90CAF9",
                level3: "#64B5F6",
                level4: "#42A5F5",
                level5: "#2196F3",
                level6: "#1E88E5",
                level7: "#1976D2",
                level8: "#1565C0",
                level9: "#0D47A1",
            },
            grey: {
                level0: "#FFFFFF",
                level1: "#F2F2F2",
                level2: "#D9D9D9",
                level3: "#BFBFBF",
                level4: "#A6A6A6",
                level5: "#8C8C8C",
                level6: "#737373",
                level7: "#595959",
                level8: "#404040",
                level9: "#262626",
            },
        },
    };
}

export default LightTheme;
