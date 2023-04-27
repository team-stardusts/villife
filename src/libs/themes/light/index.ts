import ATheme from "../absc";
import { ColorFamily, ColorScheme } from "../types";

class LightTheme extends ATheme {
    static readonly scheme: ColorScheme = "light";
    static readonly colorFamily: ColorFamily = {
        black: "#000000",
        blue: "#0B75F2",
        darkgrey: "#3B3C3D",
        green: "#ACEC22",
        grey: "#7C7C7C",
        lightblue: "#539CF1",
        lightgrey: "#D9D9D9",
        red: "#EC2222",
        white: "#FFFFFF",
    };
}

export default LightTheme;
