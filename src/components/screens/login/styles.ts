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
        },
    })
    
    const GreetingSection = StyleSheet.create({
        topLevelBox: {
            flex: 2,
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Theme.colors.colorFamily.white,
        },
        textWrapper: {
            textAlign: "left",
            paddingTop: SystemInfo.window.width * 0.1,
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
            backgroundColor: Theme.colors.colorFamily.white
        },
        attrWrapper: {
            //display: "flex",
            flex: 1,
            paddingVertical: SystemInfo.window.width * 0.08,
            paddingHorizontal: SystemInfo.window.width * 0.05,
        },
        inputWrapper: {
            flex: 7,
        },
        btnWrapper: {
            flex: 3,
        },
        inputIdentifier: {
            //fontFamily: Theme.css.font.universial.fontFamily,
            color: Theme.colors.colorFamily.black,
            fontSize: SystemInfo.window.width * 0.05,
            fontWeight: "bold",
            paddingBottom: SystemInfo.window.width * 0.02,
        },
        input: {
            backgroundColor: "white",
            height: SystemInfo.window.width * 0.08,
            borderColor: Theme.colors.colorFamily.lightgrey,
            borderWidth: SystemInfo.window.width * 0.002,
        }
    })

    const JoinLinkSection = StyleSheet.create({
        topLevelBox: {
            flex: 1,
            backgroundColor: "orange"
        }
    })

    const SocialLoginSection = StyleSheet.create({
        topLevelBox: {
            flex: 4,
            backgroundColor: "grey"
        }
    })
    
    return {
        Page,
        GreetingSection,
        LoginInputSection,
        JoinLinkSection,
        SocialLoginSection,
    } as const;
}
