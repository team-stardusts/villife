import { ScaledSize } from "react-native"
import System from "./types";


class SystemInfo implements System.SystemInfo {
    readonly window: ScaledSize;
    constructor(window: ScaledSize) {
        this.window = window
    }    
}

export default SystemInfo;