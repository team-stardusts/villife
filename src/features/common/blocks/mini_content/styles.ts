import { Platform, StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";

export default function useHomeScreenContentStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            width: "100%",
            height: deviceUI.moderateScale(200),
            marginBottom: deviceUI.moderateScale(15),
        },
        contentsContatainer: {
            width: "100%",
            height: "100%",
            paddingVertical: deviceUI.moderateScale(15),
            paddingHorizontal: deviceUI.moderateScale(25),
        },
        navigationBox: {
            flex: 2.5,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
        },
        navigationTitle: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(24),
            color: theme.color.specified.black,
            //marginBottom: deviceUI.moderateScale(5),
            //...theme.font.researved.h2,
        },
        linkIcon: {
            width: deviceUI.moderateScale(50),
            color: theme.color.specified.black,
        },
        childrenBox: {
            flex: 7.5,
        },
    });
}
