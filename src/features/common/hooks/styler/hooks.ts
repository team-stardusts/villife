import { useColorScheme } from "react-native";
import DeviceUiInfo from "../../../../libs/device";
import LightTheme from "../../../../libs/themes/light";
import { StylerReturnType } from "./types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function useStyler(): StylerReturnType {
    const safetyEdgeSize = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    let Theme;

    switch (colorScheme) {
        case "light":
            Theme = LightTheme;
            break;
        default:
            Theme = LightTheme;
    }

    return {
        deviceUI: DeviceUiInfo,
        theme: Theme,
        safetyEdgeSize,
    };
}
