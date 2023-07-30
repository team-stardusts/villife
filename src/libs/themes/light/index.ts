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
            success: "#ACEC22",
            danger: "#EC2222",
            warning: "#FFC10A",
            info: "#539CF1",
        },
        series: {
            grey: {
                level0: "",
                level1: "",
                level2: "",
                level3: "",
                level4: "",
                level5: "",
                level6: "",
                level7: "",
                level8: "",
                level9: "",
            },
        },
    };
}

export default LightTheme;
