import { ScaledSize, Platform } from "react-native/types";

export default interface ISystemInfo {
    readonly window: ScaledSize;
    readonly platform: Platform;
}

export type UseSystemInfoReturnType = ISystemInfo;
