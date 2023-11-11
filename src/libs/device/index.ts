import { PixelRatio, Platform, ScaledSize } from "react-native";
import { getBottomSpace, isIphoneX } from "react-native-iphone-x-helper";
import { DeviceUiInfo, Dimension } from "./types";

export default class DeviceUiInfoProvider implements DeviceUiInfo {
    //gives the device platform iOS or Android
    private readonly _platform: Platform["OS"] = Platform.OS;

    //gives the width & height of device
    private readonly _screenSize: Dimension;

    //calculate the width & height based on device pixel ratio
    private readonly _screenSizeWithPixelRatio: Dimension;

    //standard width/height which will be used as base for calculating the scale.
    private readonly _guidelineBase: Dimension = {
        width: 350,
        height: 680,
    };

    private _isIphoneX = isIphoneX(); //check if device is iPhoneX
    private _bottomSpace = getBottomSpace();

    /* 
     isTablet = DeviceInfo.isTablet(); //check if device is Tablet
     appVersion = DeviceInfo.getVersion(); //gives app version
     softBarHeight = ExtraDimensions.get("SOFT_MENU_BAR_HEIGHT"); //gives soft menu bar height
     statusBarHeight = ExtraDimensions.get("STATUS_BAR_HEIGHT"); //gives status bar height */

    //gives font scale based on pixel ratio

    constructor(window: ScaledSize) {
        this._screenSize = {
            width: window.width,
            height: window.height,
        };

        this._screenSizeWithPixelRatio = {
            width: window.width * PixelRatio.get(),
            height: window.height * PixelRatio.get(),
        };
    }

    public readonly fontScale: number = PixelRatio.getFontScale();

    public readonly select = Platform.select;

    public getPlatform(): Platform["OS"] {
        return this._platform;
    }

    public getScreenSize(): Dimension {
        return this._screenSize;
    }

    public getScreenSizeWithPixelRatio(): Dimension {
        return this._screenSizeWithPixelRatio;
    }

    public horizontalScale(size: number): number {
        return (this._screenSize.width / this._guidelineBase.width) * size;
    }

    public verticalScale(size: number): number {
        return (this._screenSize.height / this._guidelineBase.height) * size;
    }

    public moderateScale(size: number, factor: number = 0.5): number {
        return size + (this.horizontalScale(size) - size) * factor;
    }

    public actualScale(size: number): number {
        const inputSize = this.moderateScale(size);
        return inputSize / this.fontScale;
    }

    public isIphoneX() {
        return this._isIphoneX;
    }

    public getBottomSpace() {
        return this._bottomSpace;
    }
}
