import { StyleSheet } from "react-native";
import useSystemInfo from "../../../common/hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../common/hooks/themes_legacy/hooks";

export default function useTermsOfServiceScreenStyles() {
    const Theme = useAppThemeLegacy();
    const SystemInfo = useSystemInfo();

    const main = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: Theme.colors.colorFamily.white,
        },
        contentsWrapper: {
            flex: 8,
        },
    });

    const input = StyleSheet.create({
        container: {
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

    const blank = StyleSheet.create({
        container: {
            flex: 2,
        },
    });

    return {
        main,
        input,
        blank,
    };
}
