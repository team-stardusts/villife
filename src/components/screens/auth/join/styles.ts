import { StyleSheet } from "react-native";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import useAppTheme from "../../../../hooks/themes/hooks";
import { JoinScreenStylesType } from "./types";

export default function useJoinScreenStyles(): JoinScreenStylesType {
    const Theme = useAppTheme();
    const SystemInfo = useSystemInfo();

    const Page = StyleSheet.create({
        topLevelBox: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: Theme.colors.colorFamily.white,
        },
        contentsWrapper: {
            flex: 1,
            paddingHorizontal: SystemInfo.window.width * 0.06,
        }
    });
    const PageTitleSection = StyleSheet.create({
        topLevelBox: {
            flex: 1,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
        },
        textWrapper: {
            textAlign: "left",
            paddingTop: SystemInfo.window.width * 0.04,
        },
        text: {
            color: Theme.colors.colorFamily.blue,
            fontWeight: "bold",
            fontSize: SystemInfo.window.width * 0.07,
        }
    });

    const JoinInputSection = StyleSheet.create({
        topLevelBox: {
            flex: 3,
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
            color: Theme.colors.colorFamily.blue,
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
        btn: {
            flex: 1,
            borderRadius: SystemInfo.window.width * 0.02,
        },
        btnDisabled: {
            flex: 1,
            borderRadius: SystemInfo.window.width * 0.02,
            backgroundColor: "grey"
        },
        btnTitle: {
            color: Theme.colors.colorFamily.white,
            fontSize: SystemInfo.window.width * 0.04,
            fontWeight: "700",
        },
    });

    const BlankSection = StyleSheet.create({
        topLevelBox: {
            flex: 4,
        }
    });

    return {
        Page, 
        PageTitleSection,
        JoinInputSection,
        BlankSection,
    }
}