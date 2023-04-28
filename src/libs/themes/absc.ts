import DeviceUiInfo from "../device";
import { ColorFamily, ColorScheme } from "./types";

abstract class ATheme {
    static readonly scheme: ColorScheme;
    static readonly colorFamily: ColorFamily;

    private static fontFamilies = {
        pretendard: {
            regular: "Pretendard-Regular",
            extraBold: "Pretendard-ExtraBold",
            bold: "Pretendard-Bold",
        },
    };

    static readonly font = {
        fontFamilies: this.fontFamilies,
        researved: {
            h1: {
                fontFamily: this.fontFamilies.pretendard.extraBold,
                fontSize: DeviceUiInfo.moderateScale(32),
            },
            h2: {
                fontFamily: this.fontFamilies.pretendard.bold,
                fontSize: DeviceUiInfo.moderateScale(24),
            },
            h3: {
                fontFamily: this.fontFamilies.pretendard.bold,
                fontSize: DeviceUiInfo.moderateScale(18.72),
            },
            h4: {
                fontFamily: this.fontFamilies.pretendard.regular,
                fontSize: DeviceUiInfo.moderateScale(16),
            },
            h5: {
                fontFamily: this.fontFamilies.pretendard.regular,
                fontSize: DeviceUiInfo.moderateScale(13.28),
            },
            h6: {
                fontFamily: this.fontFamilies.pretendard.regular,
                fontSize: DeviceUiInfo.moderateScale(10.72),
            },
        },
    };
}

export default ATheme;
