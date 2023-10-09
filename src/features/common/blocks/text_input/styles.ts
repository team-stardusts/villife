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
        inputWrapper: {
            height: "100%",
        },
        unvalidInput: {
            color: theme.color.specified.red,
        },
    });
}
