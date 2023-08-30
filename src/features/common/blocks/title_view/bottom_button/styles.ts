import { StyleSheet } from "react-native";
import useStyler from "../../../hooks/styler/hooks";

export default function useScreenBottomButtonStyles() {
    const { deviceUI, theme, safetyEdgeSize } = useStyler();

    return StyleSheet.create({
        container: {
            bottom: -safetyEdgeSize.bottom,
            width: deviceUI.getScreenSize().width,
            backgroundColor: theme.color.specified.blue,
        },
        btn: {
            width: "100%",
            height: "100%",
            bottom: safetyEdgeSize.bottom,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.color.specified.blue,
        },
        title: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.white,
        },
        disabled: {
            color: theme.color.series.grey.level5,
            backgroundColor: theme.color.specified.lightgrey,
        },
    });
}
