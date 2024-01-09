import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useNotiBoxShortcutStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
        },
        newer: {
            width: deviceUI.moderateScale(14),
            height: deviceUI.moderateScale(14),
            borderRadius: deviceUI.moderateScale(14),
            backgroundColor: theme.color.specified.red,
            position: "absolute",
            top: deviceUI.moderateScale(-3),
            right: deviceUI.moderateScale(-1),
            zIndex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        newerTxt: {
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(10),
            color: theme.color.specified.white,
        },
        iconBox: {
            paddingRight: deviceUI.moderateScale(18),
        },
        icon: {
            width: deviceUI.moderateScale(50),
            color: theme.color.specified.black,
        },
    });
}
