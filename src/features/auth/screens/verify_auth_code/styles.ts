import { StyleSheet } from "react-native";
import useStyler from "../../../common/hooks/styler/hooks";
import { HostType } from "../../../../libs/rest_apis/villife/auth/types";

export default function useVerifyAuthCodeScreenStyles() {
    const { deviceUI, theme, safetyEdgeSize } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.color.specified.white,
        },
        contents: {
            flex: 1,
            //height: deviceUI.getScreenSize().height - (safetyEdgeSize.top + safetyEdgeSize.bottom),
            paddingTop: deviceUI.moderateScale(50),
        },
        marginView: {
            marginTop: deviceUI.moderateScale(150),
        },
        resendMessageWrapper: {
            marginTop: deviceUI.moderateScale(10),
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        resend: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(12),
            color: theme.color.series.grey.level2,
        },
        resendUnderline: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            textDecorationLine: "underline",
            padding: deviceUI.moderateScale(5),
        },
    });

    const input = StyleSheet.create({
        container: {
            //height: deviceUI.getScreenSize().height * 0.07,
            marginBottom: deviceUI.moderateScale(20),
            marginHorizontal: deviceUI.moderateScale(10),
        },
        titleWrapper: {
            height: deviceUI.moderateScale(20),
            marginBottom: deviceUI.moderateScale(5),
        },
        title: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(16),
            color: theme.color.specified.black,
        },
        row: {
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
        },
        inputWrapper: {
            height: deviceUI.moderateScale(40),
            width: "85%",
        },
        timerWrapper: {
            width: "10%",
        },
        timerTxt: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(12),
            color: theme.color.specified.red,
        },

        iconWrapper: {
            height: "100%",
            width: "100%",
            position: "absolute",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingRight: deviceUI.moderateScale(10),
        },
        icon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
        },
    });

    return {
        main,
        input,
    };
}
