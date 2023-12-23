import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useNotificationBoxScreenStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        nav: {
            backgroundColor: theme.color.specified.white,
        },
        container: {
            flex: 1,
            backgroundColor: theme.color.specified.white,
        },
        period: {
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(18),
            color: theme.color.specified.black,
            paddingLeft: deviceUI.moderateScale(20),
            marginVertical: deviceUI.moderateScale(10),
        },
    });
}
