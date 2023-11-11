import { EdgeInsets } from "react-native-safe-area-context";
import { DeviceUiInfo } from "../../../../libs/device/types";
import { ThemeBase } from "../../../../libs/themes/types";

export type StylerReturnType = {
    deviceUI: DeviceUiInfo;
    theme: ThemeBase;
    safetyEdgeSize: EdgeInsets;
};
