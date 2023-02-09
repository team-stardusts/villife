import { ScaledSize } from "react-native/types";

declare namespace System {
    interface SystemInfo {
        readonly window: ScaledSize;
    };
}

export declare type UseSystemInfoReturnType = System.SystemInfo;

export default System;