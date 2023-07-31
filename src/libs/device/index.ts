import { Dimensions, PixelRatio, Platform } from "react-native";
import { getBottomSpace, isIphoneX } from "react-native-iphone-x-helper";

const { width, height } = Dimensions.get("window");

export type Dimension = {
    width: number;
    height: number;
};

export default class DeviceUiInfo {
    //gives the device platform iOS or Android
    private static readonly _platform: Platform["OS"] = Platform.OS;

    //gives the width & height of device
    private static readonly _screenSize: Dimension = {
        width,
        height,
    };

    //calculate the width & height based on device pixel ratio
    private static readonly _screenSizeWithPixelRatio: Dimension = {
        width: width * PixelRatio.get(),
        height: height * PixelRatio.get(),
    };

    //standard width/height which will be used as base for calculating the scale.
    private static readonly _guidelineBase: Dimension = {
        width: 350,
        height: 680,
    };

    private static _isIphoneX = isIphoneX(); //check if device is iPhoneX
    private static _bottomSpace = getBottomSpace();

    /* 
    static isTablet = DeviceInfo.isTablet(); //check if device is Tablet
    static appVersion = DeviceInfo.getVersion(); //gives app version
    static softBarHeight = ExtraDimensions.get("SOFT_MENU_BAR_HEIGHT"); //gives soft menu bar height
    static statusBarHeight = ExtraDimensions.get("STATUS_BAR_HEIGHT"); //gives status bar height */

    //gives font scale based on pixel ratio
    public static readonly fontScale: number = PixelRatio.getFontScale();

    public static getPlatform(): Platform["OS"] {
        return this._platform;
    }

    public static getScreenSize(): Dimension {
        return this._screenSize;
    }

    public static getScreenSizeWithPixelRatio(): Dimension {
        return this._screenSizeWithPixelRatio;
    }

    public static horizontalScale(size: number): number {
        return (this._screenSize.width / this._guidelineBase.width) * size;
    }

    public static verticalScale(size: number): number {
        return (this._screenSize.height / this._guidelineBase.height) * size;
    }

    public static moderateScale(size: number, factor: number = 0.5): number {
        return size + (this.horizontalScale(size) - size) * factor;
    }

    public static actualScale(size: number): number {
        const inputSize = DeviceUiInfo.moderateScale(size);
        return inputSize / this.fontScale;
    }

    public static isIphoneX() {
        return this._isIphoneX;
    }

    public static getBottomSpace() {
        return this._bottomSpace;
    }
}
