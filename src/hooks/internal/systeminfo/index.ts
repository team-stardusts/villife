import { Dimensions, ScaledSize } from "react-native"
import System from "./types";


class SystemInfo implements System.SystemInfo {
    readonly window: ScaledSize = Dimensions.get("window")
}

export default SystemInfo;