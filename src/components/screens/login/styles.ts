import { StyleSheet } from "react-native";
import LoginScreenTypes from "./types";
import useAppTheme from "../../../hooks/internal/themes/hooks";
import useSystemInfo from "../../../hooks/internal/systeminfo/hooks";

export default function useLoginScreenStyles(): LoginScreenTypes.LoginScreenStylesType {
    const Theme = useAppTheme();
    const SystemInfo = useSystemInfo();

    const Page = StyleSheet.create({
        topLevelBox: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: Theme.colors.colorFamily.white,
        },
    })
    
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

    const LoginInputSection = StyleSheet.create({
        topLevelBox: {
            flex: 3,
        },
        attrWrapper: {
            //display: "flex",
            flex: 1,
            paddingTop: SystemInfo.window.width * 0.07,
            paddingHorizontal: SystemInfo.window.width * 0.06,
        },
        inputWrapper: {
            flex: 6,
            paddingBottom: SystemInfo.window.width * 0.02,
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
            flex: 4,
        },
        btn: {
            flex: 1,
            borderRadius: SystemInfo.window.width * 0.02,
        },
        btnTitle: {
            color: Theme.colors.colorFamily.white,
            fontSize: SystemInfo.window.width * 0.04,
            fontWeight: "700",
        }
    })

    const JoinLinkSection = StyleSheet.create({
        topLevelBox: {
            flex: 1,
        },
        textWrapper: {
            paddingTop: SystemInfo.window.width * 0.07,
            paddingHorizontal: SystemInfo.window.width * 0.28,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-around"
        },
        text: {
            fontSize: SystemInfo.window.width * 0.035,
            fontWeight: "800",
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
    
    return {
        Page,
        GreetingSection,
        LoginInputSection,
        JoinLinkSection,
        SocialLoginSection,
    } as const;
}
