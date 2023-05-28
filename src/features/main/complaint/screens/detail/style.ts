import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { ComplaintDetailScreenStylesType } from "./type";

export default function useComplaintDetailSecreenStyle(): ComplaintDetailScreenStylesType {
    const { deviceUI, theme } = useStyler();

    const leftMargin = deviceUI.moderateScale(15);
    const Style = StyleSheet.create({
        topLevelBox: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: theme.colorFamily.white,
        },
        registerButtonText: {
            marginLeft: "5%",
            fontSize: deviceUI.moderateScale(12),
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.white,
        },
        statusBarSection: {
            flexDirection: "row",
            width: "100%",
            marginBottom: deviceUI.moderateScale(15),
            marginLeft: leftMargin,
        },
        titleSection: {
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
        },
        title: {
            fontSize: deviceUI.moderateScale(24),
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            marginLeft: leftMargin,
            color: theme.colorFamily.black,
            marginTop: deviceUI.moderateScale(15),
            marginBottom: deviceUI.moderateScale(10),
        },
        editButton: {
            height: deviceUI.moderateScale(26),
            width: deviceUI.moderateScale(80),
            backgroundColor: theme.colorFamily.lightblue,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: deviceUI.moderateScale(8),
            marginRight: leftMargin,
        },
        webViewContainer: {
            opacity: 0.99,
            minHeight: 200,
            marginLeft: leftMargin,
        },
        replyTitle: {
            marginTop: deviceUI.moderateScale(30),
            fontSize: deviceUI.moderateScale(16),
            marginLeft: leftMargin,
            fontFamily: "Pretendard-Bold",
            color: theme.colorFamily.black,
        },
        horizontalLine: {
            borderBottomWidth: deviceUI.moderateScale(1),
            borderBottomColor: theme.colorFamily.blue,
            marginVertical: 10,
        },
        iconSize: {
            width: deviceUI.moderateScale(14),
        },
        blockWithIcon: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: deviceUI.moderateScale(20),
            marginLeft: deviceUI.moderateScale(15),
        },
        blockWithIconText: {
            fontSize: deviceUI.moderateScale(10),
            fontFamily: theme.font.fontFamilies.pretendard.regular,
            color: theme.colorFamily.black,
        },
        replyItem: {
            marginBottom: deviceUI.moderateScale(20),
        },
        absoulteWrapper: {
            position: "absolute",
            height: "100%",
        },
    });
    return Style;
}
