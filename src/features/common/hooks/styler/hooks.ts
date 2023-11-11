import { Dimensions, useColorScheme } from "react-native";
import DeviceUiInfoProvider from "../../../../libs/device";
import LightTheme from "../../../../libs/themes/light";
import { StylerReturnType } from "./types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { ThemeBase } from "../../../../libs/themes/types";
import { DeviceUiInfo } from "../../../../libs/device/types";

export default function useStyler(): StylerReturnType {
    const safetyEdgeSize = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const [deviceUI, setDeviceUI] = useState<DeviceUiInfo>(new DeviceUiInfoProvider(Dimensions.get("window")));
    const [theme, setTheme] = useState<ThemeBase>(new LightTheme(deviceUI));

    useEffect(() => {
        const handler = Dimensions.addEventListener("change" as any, ({ window }) => {
            console.log("[STYLER]", "The size of the window has been changed.");
            setDeviceUI(new DeviceUiInfoProvider(window));
        });

        return () => {
            handler.remove();
        };
    }, []);

    useEffect(() => {
        let _theme: ThemeBase;

        switch (colorScheme) {
            case "light":
                _theme = new LightTheme(deviceUI);
                break;
            default:
                _theme = new LightTheme(deviceUI);
        }

        setTheme(_theme);
    }, [colorScheme, deviceUI]);

    return {
        deviceUI: deviceUI,
        theme: theme,
        safetyEdgeSize,
    };
}
