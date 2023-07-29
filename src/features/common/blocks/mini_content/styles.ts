import { Platform, StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";

export default function useHomeScreenContentStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            width: "100%",
            height: deviceUI.moderateScale(240),
            //marginBottom: deviceUI.moderateScale(5),
        },
        contentsContatainer: {
            width: "100%",
            height: "100%",
            paddingVertical: deviceUI.moderateScale(15),
            paddingHorizontal: deviceUI.moderateScale(25),
        },
        navigationBox: {
            flex: 3,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        navigationTitle: {
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            fontSize: deviceUI.moderateScale(28),
            color: theme.colorFamily.black,
            //marginBottom: deviceUI.moderateScale(5),
            //...theme.font.researved.h2,
        },
        linkIcon: {
            width: deviceUI.moderateScale(50),
            color: theme.colorFamily.black,
        },
        childrenBox: {
            flex: 7,
        },
    });
}
