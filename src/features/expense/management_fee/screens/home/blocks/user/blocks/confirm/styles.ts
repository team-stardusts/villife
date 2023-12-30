import { StyleSheet } from "react-native";
import useStyler from "../../../../../../../../common/hooks/styler/hooks";

export default function useManagementFeePaymentConfirmBoxStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            //height: deviceUI.moderateScale(150),
            marginTop: deviceUI.moderateScale(15),
        },
        contentBox: {
            color: theme.color.specified.white,
        },
        contentWrapper: {
            height: "100%",
            width: "100%",
            paddingHorizontal: deviceUI.moderateScale(20),
        },
        header: {
            width: "100%",
            paddingVertical: deviceUI.moderateScale(15),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        headerText: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(20),
            color: theme.color.specified.black,
        },
        body: {
            width: "100%",
            paddingVertical: deviceUI.moderateScale(10),
        },
        /* bodyRow: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: deviceUI.moderateScale(10),
        },
        bodyRowKey: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
        },
        bodyRowValue: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
        }, */
        row: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: deviceUI.moderateScale(30),
            alignItems: "center",
            marginBottom: deviceUI.moderateScale(15),
        },
        rowKey: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            color: theme.color.specified.black,
            fontSize: deviceUI.moderateScale(14),
        },
        rowValue: {
            fontFamily: theme.font.fontFamily.pretendard.medium,
            color: theme.color.specified.black,
            fontSize: deviceUI.moderateScale(15),
        },
        iconBtn: {
            position: "absolute",
            right: -deviceUI.moderateScale(35),
            padding: deviceUI.moderateScale(10),
        },
        icon: {
            width: deviceUI.moderateScale(35),
            color: theme.color.specified.black,
        },
        footer: {
            width: "100%",
            marginBottom: deviceUI.moderateScale(10),
            flexDirection: "row",
            justifyContent: "center",
        },
        confirmationShortCutQuestionText: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(12),
            color: theme.color.specified.black,
        },
        confirmationShortCutBtn: {
            marginLeft: deviceUI.moderateScale(5),
        },
        confirmationShortCutBtnText: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(12),
            color: theme.color.specified.blue,
        },
    });
}
