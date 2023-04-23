import { StyleSheet } from "react-native";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../../hooks/themes_legacy/hooks";
import { CreateAccountScreenStylesType } from "./types";

export default function useCreateAccountScreenStyles(): CreateAccountScreenStylesType {
    const Theme = useAppThemeLegacy();
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

    const UserTypeIconSection = StyleSheet.create({
        toplevelBox: {
            flex: 2,
            flexDirection: "row",
            justifyContent: "space-evenly",
        },
    });

    const InputsSection = StyleSheet.create({
        topLevelBox: {
            flex: 6,
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: SystemInfo.window.height * 0.05,
        },
        inputsWrapper: {
            //height: "80%",
            flex: 1,
            width: "100%",
        },
        btnWrapper: {
            flex: 3,
            marginBottom: SystemInfo.window.width * 0.02,
        },
        btnDisabled: {
            flex: 1,
            borderRadius: SystemInfo.window.width * 0.02,
            backgroundColor: "grey",
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
        },
    });

    return {
        Screen,
        UserTypeIconSection,
        InputsSection,
        BlankSection,
    };
}
