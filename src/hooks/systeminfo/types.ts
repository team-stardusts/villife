import { ScaledSize, Platform } from "react-native/types";
import DotEnv from "../../libs/dotenv";


export default interface ISystemInfo {
    readonly window: ScaledSize;
    readonly platform: Platform;
};

export type UseSystemInfoReturnType = ISystemInfo;
