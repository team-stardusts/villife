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
            minHeight: deviceUI.moderateScale(10),
            marginBottom: deviceUI.moderateScale(15),
            marginLeft: leftMargin,
        },
        title: {
            fontSize: deviceUI.moderateScale(24),
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            marginLeft: leftMargin,
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
        replyInputContainer: {
            borderColor: theme.colorFamily.blue,
            borderWidth: deviceUI.moderateScale(1),
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
        },
        replyTextInput: {
            minheight: deviceUI.moderateScale(10),
            width: "80%",
            fontFamily: theme.font.fontFamilies.pretendard.bold,
        },
        replyImageIconSize: {
            width: deviceUI.moderateScale(24),
        },
        imageIconBox: {
            height: deviceUI.moderateScale(30),
            width: deviceUI.moderateScale(40),
            justifyContent: "center",
            alignItems: "center",
        },
        verticalLine: {
            borderLeftColor: theme.colorFamily.blue,
            borderLeftWidth: deviceUI.moderateScale(1),
            height: "100%",
            width: deviceUI.moderateScale(1),
        },
    });
    return Style;
}
