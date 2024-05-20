import { StyleSheet } from "react-native";
import useStyler from "../../../common/hooks/styler/hooks";
import useNavigationViewSpace from "../../../common/blocks/navigation/service";

export default function useLoginScreenStyles() {
    const { deviceUI, theme } = useStyler();
    const space = useNavigationViewSpace({
        applyDefaultVerticalPadding: false,
        applyDefaultHorizontalPadding: true,
        isBottomNavShown: false,
        isHeaderShown: true,
    });

    const main = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.color.specified.white,
        },
        wrapper: {
            paddingTop: deviceUI.moderateScale(25),
        },
        inputBox: {
            marginBottom: deviceUI.moderateScale(10),
        },
        inputTitle: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(18),
            color: theme.color.specified.black,
            marginBottom: deviceUI.moderateScale(4),
        },
        inputWrapper: {
            height: deviceUI.moderateScale(40),
        },
        btnWrapper: {
            height: deviceUI.getScreenSize().height * 0.065,
            marginTop: deviceUI.moderateScale(10),
        },
    });

    const input = StyleSheet.create({
        container: {
            flex: 3.5,
        },
        contents: {
            flex: 1,
            paddingTop: deviceUI.moderateScale(20),
        },
        inputBox: {
            flex: 4,
            marginBottom: deviceUI.moderateScale(8),
        },
        inputIdentifier: {
            color: theme.color.specified.black,
            paddingBottom: deviceUI.moderateScale(4),
            ...theme.font.researved.h3,
        },
        input: {
            height: "45%",
        },
        btnWrapper: {
            flex: 3,
            marginBottom: deviceUI.moderateScale(8),
        },
        btnTitle: {
            color: theme.color.specified.white,
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
        appleBtnWrapper: {
            width: "100%",
            marginTop: deviceUI.moderateScale(8),
        },
        appleBtn: {
            width: space.width,
            height: space.height * 0.08,
        },
    });

    const link = StyleSheet.create({
        container: {
            width: "100%",
            alignItems: "center",
        },
        wrapper: {
            width: "100%",
            maxWidth: 400,
            paddingTop: deviceUI.moderateScale(20),
            flexDirection: "row",
            justifyContent: "center",
        },
        spacer: {
            marginHorizontal: 10,
        },
        text: {
            color: theme.color.specified.black,
            fontSize: deviceUI.moderateScale(12),
        },
    });

    return {
        main,
        input,
        link,
    } as const;
}
