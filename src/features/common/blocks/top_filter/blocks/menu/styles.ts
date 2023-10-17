import { StyleSheet } from "react-native";
import useStyler from "../../../../hooks/styler/hooks";

export default function useMenuStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flexDirection: "row",
            backgroundColor: theme.color.specified.white,
            borderColor: theme.color.series.grey.level1,
            borderTopWidth: deviceUI.moderateScale(2),
            borderBottomWidth: deviceUI.moderateScale(2),
        },
        menuWrapper: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        menuTouchBox: {
            height: "100%",
            paddingHorizontal: deviceUI.moderateScale(15),
        },
        menu: {
            height: "100%",
            justifyContent: "center",
        },
        selectedMenu: {
            borderColor: theme.color.specified.black,
            borderBottomWidth: deviceUI.moderateScale(2),
        },
        menuText: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.series.grey.level2,
            fontSize: deviceUI.moderateScale(15),
        },
        selectedMenuText: {
            color: theme.color.specified.black,
        },
    });
}
