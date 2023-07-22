import { Platform, StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";

export default function useHomeScreenContentStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            width: "100%",
            height: deviceUI.moderateScale(220),
            marginBottom: deviceUI.moderateScale(5),
        },
        navigationBox: {
            flex: 2,
            width: "40%",
        },
        navigationWrapper: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        },
        navigationTitle: {
            color: theme.colorFamily.black,
            marginBottom: deviceUI.moderateScale(5),
            ...theme.font.researved.h2,
        },
        contentWrapper: {
            flex: 8,
        },
    });
}
