import { StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";

export default function useInputPhoneNumberStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            height: "100%",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
        },
        row: {
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
        },
        extMargin: {
            marginRight: deviceUI.moderateScale(10),
        },
        extTxt: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.actualScale(16),
            color: theme.color.specified.darkgrey,
        },
        inputWrapper: {
            height: "100%",
        },
        unvalidInput: {
            color: theme.color.specified.red,
        },
    });
}
