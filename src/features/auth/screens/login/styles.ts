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
            flexDirection: "column",
            backgroundColor: theme.color.specified.white,
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

    const joinLink = StyleSheet.create({
        container: {
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
        main,
        input,
        joinLink,
    } as const;
}
