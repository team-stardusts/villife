import { StyleSheet } from "react-native";
import useStyler from "../../../common/hooks/styler/hooks";

export default function useAuthScreenCommonInputStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
        },
        titleBox: {
            flex: 3.3,
            marginBottom: deviceUI.moderateScale(3),
            justifyContent: "center",
        },
        title: {
            color: theme.color.specified.blue,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(16),
        },
        inputBox: {
            flex: 3.4,
        },
        validatorBox: {
            flex: 3.3,
            alignItems: "center",
            height: deviceUI.moderateScale(50),
            paddingTop: deviceUI.moderateScale(4),
            flexDirection: "row",
        },
    });
}
