import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useNotiLableStyles() {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        container: {
            width: deviceUI.moderateScale(50),
            height: deviceUI.moderateScale(27),
            borderRadius: deviceUI.moderateScale(12),
            justifyContent: "center",
            alignItems: "center",
        },
        blue: {
            backgroundColor: theme.color.specified.lightblue,
        },
        green: {
            backgroundColor: theme.color.specified.green,
        },
        gray: {
            backgroundColor: theme.color.specified.grey,
        },
        textStyle: {
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.white,
        },
    });
}
