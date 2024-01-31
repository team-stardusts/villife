import { StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";

export default function useScreenTtitleViewStyles(disabledPaddingTop?: boolean) {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            paddingTop: disabledPaddingTop ? deviceUI.moderateScale(20) : deviceUI.moderateScale(70),
            paddingHorizontal: deviceUI.moderateScale(18),
        },
        titleBox: {
            //flex: 1.24,
            justifyContent: "center",
            textAlign: "left",
        },
        title: {
            color: theme.color.specified.blue,
            marginBottom: deviceUI.moderateScale(3),
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(23),
        },
        subtitle: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(14),
        },
        children: {
            flex: 9.2,
        },
        btnBox: {
            flex: 0.8,
            position: "relative",
            //marginTop: deviceUI.moderateScale(20),
            left: -deviceUI.moderateScale(18),
        },
    });
}
