import ATheme from "../absc";
import { ColorFamily, ColorScheme } from "../types";

class LightTheme extends ATheme {
    static readonly scheme: ColorScheme = "light";
    static readonly color: ColorFamily = {
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
