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
        },
        contentsWrapper: {
            flex: 8,
        },
    });

    const TitleSection = StyleSheet.create({
        /*
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
        */
    });

    const InputsSection = StyleSheet.create({
        topLevelBox: {
            flex: 5,
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: SystemInfo.window.height * 0.04,
        },
        inputsWrapper: {
            height: "80%",
            width: "100%",
        },
        attrWrapper: {
            //display: "flex",
            flex: 1,
            paddingTop: SystemInfo.window.width * 0.07,
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
            flex: 2,
        }
    });

    return {
        Screen, 
        //TitleSection,
        InputsSection,
        BlankSection,
    }
}