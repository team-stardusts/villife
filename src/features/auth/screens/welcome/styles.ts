import { StyleSheet } from "react-native";
import useStyler from "../../../common/hooks/styler/hooks";

export default function useWelcomeScreenStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.color.specified.white,
        },
        userIconBox: {
            flex: 3,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: deviceUI.moderateScale(20),
        },
        greetingBox: {
            flex: 7,
        },
    });
}
