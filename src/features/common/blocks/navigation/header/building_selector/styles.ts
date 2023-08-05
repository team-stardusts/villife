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
            alignItems: "center",
            justifyContent: "center",
        },
        iconBox: {
            alignItems: "center",
            justifyContent: "center",
            marginRight: deviceUI.moderateScale(10),
        },
        textBox: {
            alignItems: "flex-start",
            justifyContent: "center",
        },
        icon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
        },
        buildingName: {
            color: theme.color.specified.black,
            ...theme.font.researved.h4,
        },
    });
}
