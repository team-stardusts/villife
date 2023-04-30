import { StyleSheet } from "react-native";
import { LoginScreenStylesType } from "./types";
import useStyler from "../../../common/hooks/styler/hooks";

export default function useLoginScreenStyles(): LoginScreenStylesType {
    const { deviceUI, theme } = useStyler();

    const Screen = StyleSheet.create({
        topLevelBox: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: theme.colorFamily.white,
        },
        contentsBox: {
            flex: 1,
            paddingHorizontal: deviceUI.moderateScale(22),
        },
    });

    const LoginInputSection = StyleSheet.create({
        topLevelBox: {
            flex: 3.5,
        },
        attrWrapper: {
            flex: 1,
            paddingTop: deviceUI.moderateScale(20),
        },
        inputWrapper: {
            flex: 4,
            marginBottom: deviceUI.moderateScale(8),
        },
        inputIdentifier: {
            color: theme.colorFamily.black,
            paddingBottom: deviceUI.moderateScale(4),
            ...theme.font.researved.h3,
        },
        input: {
            backgroundColor: theme.colorFamily.white,
            borderRadius: deviceUI.moderateScale(8),
            margin: 0,
            paddingVertical: deviceUI.moderateScale(4),
            paddingHorizontal: deviceUI.moderateScale(8),
        },
        btnWrapper: {
            flex: 3,
            marginBottom: deviceUI.moderateScale(8),
        },
        btnTitle: {
            color: theme.colorFamily.white,
            fontWeight: "bold",
            ...theme.font.researved.h5,
        },
        socialLoginBtn: {
            flex: 3,
            backgroundColor: "#03c75a",
            borderRadius: deviceUI.moderateScale(8),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        socialLoginBtnIconWrapper: {
            position: "absolute",
            left: deviceUI.moderateScale(12),
            paddingVertical: 2,
        },
    });

    const JoinLinkSection = StyleSheet.create({
        topLevelBox: {
            flex: 3.5,
        },
        textWrapper: {
            paddingTop: deviceUI.moderateScale(20),
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
        },
        text: {
            ...theme.font.researved.h5,
        },
    });

    return {
        Screen,
        LoginInputSection,
        JoinLinkSection,
    } as const;
}
