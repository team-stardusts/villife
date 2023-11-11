import { Platform } from "react-native";

export interface DeviceUiInfo {
    fontScale: number;
    select: Platform["select"];
    getPlatform(): Platform["OS"];
    getScreenSize(): Dimension;
    getScreenSizeWithPixelRatio(): Dimension;
    horizontalScale(size: number): number;
    verticalScale(size: number): number;
    moderateScale(size: number, factor?: number): number;
    actualScale(size: number): number;
    isIphoneX(): boolean;
    getBottomSpace(): number;
}

export type Dimension = {
    width: number;
    height: number;
};
