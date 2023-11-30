import { StyleSheet } from "react-native";
import useStyler from "../../../common/hooks/styler/hooks";

export default function useAuthScreenCommonInputStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            justifyContent: "center",
        },
        titleBox: {
            height: deviceUI.getScreenSize().height * 0.04,
            //marginBottom: deviceUI.moderateScale(3),
            justifyContent: "center",
        },
        title: {
            color: theme.color.specified.blue,
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(18),
        },
        inputBox: {
            height: deviceUI.getScreenSize().height * 0.05,
        },
        validatorBox: {
            alignItems: "center",
            height: deviceUI.getScreenSize().height * 0.05,
            flexDirection: "row",
        },
    });
}
