import { StyleSheet } from "react-native";
import useStyler from "../../../common/hooks/styler/hooks";

export default function useAuthScreenCommonInputStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        inputWrapper: {
            flex: 7,
        },
        inputTitle: {
            //fontFamily: Theme.css.font.universial.fontFamily,
            color: theme.colorFamily.blue,
            fontWeight: "bold",
            paddingBottom: deviceUI.moderateScale(3),
            ...theme.font.researved.h4,
        },
        validatorWrapper: {
            flex: 3,
            paddingTop: deviceUI.moderateScale(4),
            flexDirection: "row",
        },
    });
}
