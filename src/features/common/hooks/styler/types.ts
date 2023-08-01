import { EdgeInsets } from "react-native-safe-area-context";
import DeviceUiInfo from "../../../../libs/device";
import ATheme from "../../../../libs/themes/absc";

export type StylerReturnType = {
    deviceUI: typeof DeviceUiInfo;
    theme: typeof ATheme;
    safetyEdgeSize: EdgeInsets;
};
