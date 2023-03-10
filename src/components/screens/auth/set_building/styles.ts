import { StyleSheet } from "react-native";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import useAppTheme from "../../../../hooks/themes/hooks";
import { SetBuildingScreenStylesType } from "./types";

export default function useSetBuildingScreenStyles(): SetBuildingScreenStylesType {
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

    const InputsSection = StyleSheet.create({
        topLevelBox: {
            flex: 6,
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
        InputsSection,
        BlankSection,
    }
}