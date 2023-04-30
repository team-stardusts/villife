import { StyleSheet } from "react-native";
import useSystemInfo from "../../../common/hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../common/hooks/themes_legacy/hooks";

export default function PermissionRequestScreenStyle() {
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
            paddingHorizontal: SystemInfo.window.width * 0.068,
        },
        contentsWrapper: {
            flex: 8,
        },
    });

    const ContentsSection = StyleSheet.create({
        topLevelBox: {
            flex: 6,
        },
        horizontalLine: {
            paddingHorizontal: SystemInfo.window.width * 0.06,
            paddingVertical: SystemInfo.window.width * 0.002,
            backgroundColor: Theme.colors.colorFamily.blue,
            marginBottom: SystemInfo.window.width * 0.068,
        },
        barSort: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: SystemInfo.window.width * 0.065,
        },
        descriptionMessage: {
            color: Theme.colors.colorFamily.black,
            fontWeight: "bold",
            fontSize: SystemInfo.window.width * 0.03,
            marginLeft: SystemInfo.window.width * 0.009,
        },
        switchButton: {},
    });

    const BlankSection = StyleSheet.create({
        topLevelBox: {
            flex: 2,
        },
    });

    return {
        Screen,
        ContentsSection,
        BlankSection,
    };
}
