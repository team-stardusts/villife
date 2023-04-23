import { Dimensions, PixelRatio, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export type Dimension = {
    width: number;
    height: number;
};

export default class DeviceUiInfo {
    //gives the device platform iOS or Android
    static platform: Platform["OS"] = Platform.OS;

    //gives the width & height of device
    static screenSize: Dimension = {
        width,
        height,
    };

    //calculate the width & height based on device pixel ratio
    static screenSizeWithPixelRatio: Dimension = {
        width: width * PixelRatio.get(),
        height: height * PixelRatio.get(),
    };

    //standard width/height which will be used as base for calculating the scale.
    static guidelineBase: Dimension = {
        width: 350,
        height: 680,
    };

    /*static isIphoneX = isIphoneX(); //check if device is iPhoneX
    static isTablet = DeviceInfo.isTablet(); //check if device is Tablet
    static appVersion = DeviceInfo.getVersion(); //gives app version
    static softBarHeight = ExtraDimensions.get("SOFT_MENU_BAR_HEIGHT"); //gives soft menu bar height
    static statusBarHeight = ExtraDimensions.get("STATUS_BAR_HEIGHT"); //gives status bar height */

    //gives font scale based on pixel ratio
    static fontScale: number = PixelRatio.getFontScale();

    static getPlatform(): Platform["OS"] {
        return this.platform;
    }

    static getScreenSize(): Dimension {
        return this.screenSize;
    }

    static getScreenSizeWithPixelRatio(): Dimension {
        return this.screenSizeWithPixelRatio;
    }

    static horizontalScale(size: number): number {
        return (this.screenSize.width / this.guidelineBase.width) * size;
    }

    static verticalScale(size: number): number {
        return (this.screenSize.height / this.guidelineBase.height) * size;
    }

    static moderateScale(size: number, factor: number = 0.5): number {
        return size + (this.horizontalScale(size) - size) * factor;
    }

    static actualScale(size: number): number {
        const inputSize = DeviceUiInfo.moderateScale(size);
        return inputSize / this.fontScale;
    }

    /* static isIphoneX() {
        return this.isIphoneX;
    } */
}
