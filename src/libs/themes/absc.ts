import { DeviceUiInfo } from "../device/types";
import { ColorFamily, ColorScheme, FontFamily, ThemeBase } from "./types";

abstract class ThemeCommon implements ThemeBase {
    abstract readonly scheme: ColorScheme;
    abstract readonly color: ColorFamily;
    protected readonly deviceInfo: DeviceUiInfo;
    public readonly font;

    private readonly fontFamily: FontFamily = {
        pretendard: {
            regular: "Pretendard-Regular",
            extraBold: "Pretendard-ExtraBold",
            medium: "Pretendard-Medium",
            bold: "Pretendard-Bold",
            semiBold: "Pretendard-SemiBold",
        },
    };

    constructor(deviceInfo: DeviceUiInfo) {
        this.deviceInfo = deviceInfo;
        this.font = {
            fontFamily: this.fontFamily,
            researved: {
                h1: {
                    fontFamily: this.fontFamily.pretendard.extraBold,
                    fontSize: this.deviceInfo.moderateScale(32),
                },
                h2: {
                    fontFamily: this.fontFamily.pretendard.bold,
                    fontSize: this.deviceInfo.moderateScale(24),
                },
                h3: {
                    fontFamily: this.fontFamily.pretendard.bold,
                    fontSize: this.deviceInfo.moderateScale(18.72),
                },
                h4: {
                    fontFamily: this.fontFamily.pretendard.regular,
                    fontSize: this.deviceInfo.moderateScale(16),
                },
                h5: {
                    fontFamily: this.fontFamily.pretendard.regular,
                    fontSize: this.deviceInfo.moderateScale(13.28),
                },
                h6: {
                    fontFamily: this.fontFamily.pretendard.regular,
                    fontSize: this.deviceInfo.moderateScale(10.72),
                },
            },
        };
    }
}

export default ThemeCommon;
