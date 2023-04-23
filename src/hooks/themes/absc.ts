import { ColorFamily, ITheme } from "./types";

abstract class ATheme implements ITheme {
    abstract colorFamiliy: ColorFamily;

    private fontFamilies = {
        pretendard: {
            default: "Pretendard-Regular",
            extraBold: "Pretendard-ExtraBold",
            bold: "Pretendard-Bold",
        },
    };

    readonly font = {
        fontFamilies: this.fontFamilies,
        researved: {
            title1: {
                fontFamily: this.fontFamilies.pretendard.extraBold,
                fontsize: 26,
            },
        },
    };
}

export default ATheme;
