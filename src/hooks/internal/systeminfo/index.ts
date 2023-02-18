import { ScaledSize, Platform } from "react-native"
import System from "./types";

class SystemInfo implements System.SystemInfo {
    readonly window: ScaledSize;
    readonly platform: Platform;
    constructor(window: ScaledSize) {
        this.window = window;
        this.platform = Platform;
    }    
}

export default SystemInfo;