import { StyleSheet } from "react-native";
import useStyler from "../../../../../../../../common/hooks/styler/hooks";

export default function useManagementFeeBoxStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            paddingVertical: deviceUI.moderateScale(15),
        },
        contentBox: {
            color: theme.color.specified.white,
        },
        contentWrapper: {
            width: "100%",
            paddingHorizontal: deviceUI.moderateScale(20),
        },
        header: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            //paddingVertical: deviceUI.moderateScale(10),
            //marginTop: deviceUI.moderateScale(10),
        },
        headerText: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(14),
            color: theme.color.specified.black,
        },
        dueDate: {
            color: theme.color.specified.blue,
        },
        body: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        managementFeeBox: {
            flexDirection: "row",
            alignItems: "center",
            marginVertical: deviceUI.moderateScale(25),
        },
        managementFee: {
            fontFamily: theme.font.fontFamily.pretendard.extraBold,
            fontSize: deviceUI.moderateScale(25),
            color: theme.color.specified.black,
            marginLeft: deviceUI.moderateScale(7),
        },
        paymentBtnCombo: {
            flexDirection: "row",
            alignItems: "center",
        },
        paymentBtnSeparator: {
            marginHorizontal: deviceUI.moderateScale(4),
        },
        paymentBtn: {
            alignItems: "center",
            justifyContent: "center",
            paddingRight: deviceUI.moderateScale(5),
        },
        paymentBtnText: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.specified.black,
        },
        paymentDeadlineBox: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            //paddingVertical: deviceUI.moderateScale(20),
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
