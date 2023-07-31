import DeviceUiInfo from "../device";
import { ColorFamily, ColorScheme } from "./types";

abstract class ATheme {
    static readonly scheme: ColorScheme;
    static readonly color: ColorFamily;

    private static fontFamily = {
        pretendard: {
            regular: "Pretendard-Regular",
            extraBold: "Pretendard-ExtraBold",
            medium: "Pretendard-Medium",
            bold: "Pretendard-Bold",
        },
    };

    static readonly font = {
        fontFamily: this.fontFamily,
        researved: {
            h1: {
                fontFamily: this.fontFamily.pretendard.extraBold,
                fontSize: DeviceUiInfo.moderateScale(32),
            },
            h2: {
                fontFamily: this.fontFamily.pretendard.bold,
                fontSize: DeviceUiInfo.moderateScale(24),
            },
            h3: {
                fontFamily: this.fontFamily.pretendard.bold,
                fontSize: DeviceUiInfo.moderateScale(18.72),
            },
            h4: {
                fontFamily: this.fontFamily.pretendard.regular,
                fontSize: DeviceUiInfo.moderateScale(16),
            },
            h5: {
                fontFamily: this.fontFamily.pretendard.regular,
                fontSize: DeviceUiInfo.moderateScale(13.28),
            },
            h6: {
                fontFamily: this.fontFamily.pretendard.regular,
                fontSize: DeviceUiInfo.moderateScale(10.72),
            },
        },
    };
}

export default ATheme;
