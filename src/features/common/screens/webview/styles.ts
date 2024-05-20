import { StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";

export default function useManualScreenStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        nav: {
            color: theme.color.specified.white,
        },
        container: {
            flex: 1,
            backgroundColor: theme.color.specified.white,
        },
        spinnerWrapper: {
            position: "absolute",
            top: 0,
            zIndex: 1,
            width: deviceUI.getScreenSize().width,
            height: deviceUI.getScreenSize().height * 0.85,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: deviceUI.moderateScale(50),
        },
        spinner: {
            width: deviceUI.moderateScale(100),
            color: theme.color.specified.lightblue,
        },
    });
}
