import { ScaledSize, Platform } from "react-native";
import ISystemInfo from "./types";

class SystemInfo implements ISystemInfo {
    readonly window: ScaledSize;
    readonly platform: Platform; // ios or android

    constructor(window: ScaledSize) {
        this.window = window;
        this.platform = Platform;
    }
}

export default SystemInfo;
