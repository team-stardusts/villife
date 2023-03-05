import { ScaledSize, Platform } from "react-native/types";

declare namespace System {
    interface SystemInfo {
        readonly window: ScaledSize;
        readonly platform: Platform;
    };
}

export declare type UseSystemInfoReturnType = System.SystemInfo;

export default System;