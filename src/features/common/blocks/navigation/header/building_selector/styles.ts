import { StyleSheet } from "react-native";
import useStyler from "../../../../hooks/styler/hooks";

export default function useBuildingSelectorStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            justifyContent: "center",
        },
        wrapper: {
            flex: 1,
            width: "90%",
            flexDirection: "row",
        },
        iconBox: {
            flex: 3,
            alignItems: "center",
            justifyContent: "center",
        },
        textBox: {
            flex: 7,
            alignItems: "flex-start",
            justifyContent: "center",
        },
        icon: {
            width: deviceUI.moderateScale(18),
            color: theme.colorFamily.black,
        },
        buildingName: {
            color: theme.colorFamily.black,
            ...theme.font.researved.h4,
        },
    });
}
