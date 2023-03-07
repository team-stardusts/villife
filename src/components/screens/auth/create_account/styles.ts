import { StyleSheet } from "react-native";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import useAppTheme from "../../../../hooks/themes/hooks";
import { CreateAccountScreenStylesType } from "./types";

export default function useCreateAccountScreenStyles(): CreateAccountScreenStylesType {
    const Theme = useAppTheme();
    const SystemInfo = useSystemInfo();

    const Screen = StyleSheet.create({
        topLevelBox: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: Theme.colors.colorFamily.white,
        },
        screenWrapper: {
            flex: 1,
            paddingHorizontal: SystemInfo.window.width * 0.06,
        }
    });

    const TitleSection = StyleSheet.create({
        topLevelBox: {
            flex: 2,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
        },
        textWrapper: {
            textAlign: "left",
            paddingTop: SystemInfo.window.width * 0.04,
        },
        title: {
            color: Theme.colors.colorFamily.blue,
            fontWeight: "bold",
            fontSize: SystemInfo.window.width * 0.07,
        },
        subtitle: {
            color: Theme.colors.colorFamily.black,
            fontSize: SystemInfo.window.width * 0.03,
        }
    });

    const ContentsSection = StyleSheet.create({
        topLevelBox: {
            flex: 8,
        },
    });

    const AccountInputSection = StyleSheet.create({
        topLevelBox: {
            flex: 5,
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
        btnWrapper: {
            flex: 3,
            marginBottom: SystemInfo.window.width * 0.02,
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
            flex: 5,
        }
    });

    return {
        Screen, 
        TitleSection,
        ContentsSection,
        AccountInputSection,
        BlankSection,
    }
}