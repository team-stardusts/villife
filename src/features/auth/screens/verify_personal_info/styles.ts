import { StyleSheet } from "react-native";
import useStyler from "../../../common/hooks/styler/hooks";
import { HostType } from "../../../../libs/rest_apis/villife/auth/types";

export default function useVerifyPersonalInfoScreenStyles() {
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
    });

    const input = StyleSheet.create({
        container: {
            //height: deviceUI.getScreenSize().height * 0.07,
            marginBottom: deviceUI.moderateScale(20),
        },
        titleWrapper: {
            height: deviceUI.moderateScale(20),
            marginBottom: deviceUI.moderateScale(5),
        },
        title: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(16),
            color: theme.color.specified.blue,
        },
        inputWrapper: {
            height: deviceUI.moderateScale(40),
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
