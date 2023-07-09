import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useTimeSelectionModalStyles(height: number) {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            height: height,
            justifyContent: "center",
            alignItems: "center",
            width: deviceUI.getScreenSize().width,
        },
        wrapper: {
            height: deviceUI.getScreenSize().height * 0.15,
        },
    });
}
