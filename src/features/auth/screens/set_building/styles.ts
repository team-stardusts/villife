import { StyleSheet } from "react-native";
import useSystemInfo from "../../../common/hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../common/hooks/themes_legacy/hooks";
import { SetBuildingScreenStylesType } from "./types";

export default function useSetBuildingScreenStyles(): SetBuildingScreenStylesType {
    const theme = useAppThemeLegacy();
    const systemInfo = useSystemInfo();

    const Screen = StyleSheet.create({
        topLevelBox: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: theme.colors.colorFamily.white,
        },
        screenWrapper: {
            flex: 1,
            paddingHorizontal: systemInfo.window.width * 0.06,
        },
        contentsWrapper: {
            flex: 8,
        },
    });

    const InputsSection = StyleSheet.create({
        topLevelBox: {
            flex: 3,
        },
        attrWrapper: {
            //display: "flex",
            flex: 1,
            paddingTop: systemInfo.window.width * 0.07,
        },
        inputWrapper: {
            flex: 4,
            marginBottom: systemInfo.window.width * 0.02,
        },
        inputIdentifier: {
            //fontFamily: Theme.css.font.universial.fontFamily,
            color: theme.colors.colorFamily.blue,
            fontSize: systemInfo.window.width * 0.05,
            fontWeight: "bold",
            paddingBottom: systemInfo.window.width * 0.01,
        },
        btnWrapper: {
            flex: 3,
            marginBottom: systemInfo.window.width * 0.02,
        },
        btnTitle: {
            color: theme.colors.colorFamily.white,
            fontSize: systemInfo.window.width * 0.04,
            fontWeight: "700",
        },
    });

    const BlankSection = StyleSheet.create({
        topLevelBox: {
            flex: 5,
        },
    });

    return {
        screen: Screen,
        inputsSection: InputsSection,
        blankSection: BlankSection,
    };
}
