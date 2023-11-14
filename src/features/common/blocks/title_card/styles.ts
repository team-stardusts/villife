import { StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";

export default function useTitleCardViewStyles(minHeight?: number) {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: minHeight === undefined ? 1 : undefined,
            minHeight: minHeight,
        },
        contentBox: {
            backgroundColor: theme.color.specified.white,
        },
        wrapper: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(20),
            paddingVertical: deviceUI.moderateScale(10),
        },
        body: {
            flex: 1,
            width: "100%",
        },
    });

    const header = StyleSheet.create({
        container: {
            height: deviceUI.moderateScale(50),
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: theme.color.series.grey.level1,
            borderBottomWidth: deviceUI.moderateScale(5),
            paddingHorizontal: deviceUI.moderateScale(5),
        },
        title: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(24),
            color: theme.color.specified.black,
        },
        button: {
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(12),
            paddingVertical: deviceUI.moderateScale(5),
            backgroundColor: theme.color.series.grey.level1,
            borderRadius: deviceUI.moderateScale(10),
        },
        buttonTitle: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(12),
            color: theme.color.specified.black,
        },
    });

    return {
        main,
        header,
    };
}
