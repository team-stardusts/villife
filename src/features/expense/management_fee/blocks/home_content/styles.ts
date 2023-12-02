import { Platform, StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useHomeContentFromManagementFeeStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        contentsBox: {
            color: theme.color.specified.black,
            backgroundColor: theme.color.specified.white,
        },
        container: {
            flex: 1,
            alignItems: "center",
        },
        header: {
            flex: 2,
            width: "100%",
            justifyContent: "flex-end",
        },
        headerText: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.specified.black,
        },
        body: {
            flex: 5,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            //marginBottom: deviceUI.moderateScale(20),
        },
        bottom: {
            flex: 2,
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            //marginBottom: deviceUI.moderateScale(20),
        },
        bottomText: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.specified.black,
        },
        confirmationShortCutBtn: {
            marginLeft: deviceUI.moderateScale(5),
        },
        confirmationShortCutBtnText: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.specified.blue,
        },
        managementFeeBox: {
            flexDirection: "row",
            alignItems: "center",
        },
        managementFee: {
            fontFamily: theme.font.fontFamily.pretendard.extraBold,
            fontSize: deviceUI.moderateScale(25),
            color: theme.color.specified.black,
        },
        paymentBtn: {
            borderRadius: deviceUI.moderateScale(20),
            backgroundColor: theme.color.series.grey.level1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: deviceUI.moderateScale(10),
            paddingVertical: deviceUI.moderateScale(5),
        },
        paymentText: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(12),
            color: theme.color.specified.black,
        },
    });
}
