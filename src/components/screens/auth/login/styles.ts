import { StyleSheet } from "react-native";
import LoginScreenTypes, { LoginScreenStylesType } from "./types";
import useAppThemeLegacy from "../../../../hooks/themes_legacy/hooks";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";

export default function useLoginScreenStyles(): LoginScreenStylesType {
    const Theme = useAppThemeLegacy();
    const SystemInfo = useSystemInfo();

    const Screen = StyleSheet.create({
        topLevelBox: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: Theme.colors.colorFamily.white,
        },
        contentsBox: {
            flex: 1,
            paddingHorizontal: SystemInfo.window.width * 0.06,
        },
    });

    const LoginInputSection = StyleSheet.create({
        topLevelBox: {
            flex: 3.5,
        },
        attrWrapper: {
            //display: "flex",
            flex: 1,
            paddingTop: SystemInfo.window.width * 0.07,
        },
        inputWrapper: {
            flex: 4,
            marginBottom: SystemInfo.window.width * 0.02,
        },
        inputIdentifier: {
            //fontFamily: Theme.css.font.universial.fontFamily,
            color: Theme.colors.colorFamily.black,
            fontSize: SystemInfo.window.width * 0.05,
            fontWeight: "bold",
            paddingBottom: SystemInfo.window.width * 0.01,
        },
        input: {
            backgroundColor: "white",
            height: SystemInfo.window.width * 0.08,
            borderRadius: SystemInfo.window.width * 0.02,
            margin: 0,
            paddingVertical: SystemInfo.window.width * 0.01,
            paddingHorizontal: SystemInfo.window.width * 0.02,
        },
        btnWrapper: {
            flex: 3,
            marginBottom: SystemInfo.window.width * 0.02,
        },
        btnTitle: {
            color: Theme.colors.colorFamily.white,
            fontSize: SystemInfo.window.width * 0.04,
            fontWeight: "700",
        },
        socialLoginBtn: {
            flex: 3,
            backgroundColor: "#03c75a",
            borderRadius: SystemInfo.window.width * 0.02,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        socialLoginPressedIn: {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0.3,
            backgroundColor: Theme.colors.colorFamily.lightgrey,
            borderRadius: SystemInfo.window.width * 0.02,
        },
        socialLoginBtnIconWrapper: {
            position: "absolute",
            left: SystemInfo.window.width * 0.03,
            paddingVertical: 2,
        },
        socialLoginBtnTitle: {
            color: Theme.colors.colorFamily.white,
            fontSize: SystemInfo.window.width * 0.04,
            fontWeight: "700",
        },
    });

    const JoinLinkSection = StyleSheet.create({
        topLevelBox: {
            flex: 3.5,
        },
        textWrapper: {
            paddingTop: SystemInfo.window.width * 0.07,
            paddingHorizontal: SystemInfo.window.width * 0.22,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-around",
        },
        text: {
            fontWeight: "800",
        },
    });

    /*
    const GreetingSection = StyleSheet.create({
        topLevelBox: {
            flex: 2,
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
        },
        textWrapper: {
            textAlign: "left",
            paddingTop: SystemInfo.window.width * 0.2,
        },
        text: {
            //fontFamily: Theme.css.font.universial.fontFamily,
            color: Theme.colors.colorFamily.blue,
            fontSize: SystemInfo.window.width * 0.07,
            fontWeight: "bold",
        }
    })

    const SocialLoginSection = StyleSheet.create({
        topLevelBox: {
            flex: 4,
            alignItems: "center",
        },
        iconsWrapper: {
            paddingTop: SystemInfo.window.width * 0.05,
            flexDirection: "row",
            justifyContent: "space-around",
            width: "50%"
        },
    })
    */

    return {
        Screen,
        LoginInputSection,
        JoinLinkSection,
        //SocialLoginSection,
    } as const;
}
