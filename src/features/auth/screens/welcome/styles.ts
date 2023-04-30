import { StyleSheet } from "react-native";
import useSystemInfo from "../../../common/hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../common/hooks/themes_legacy/hooks";

export default function useWelcomeScreenStyles() {
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
    });

    const ContentsSection = StyleSheet.create({
        toplevelBox: {
            flex: 6,
            alignItems: "center",
        },
        iconBox: {
            flex: 6,
            justifyContent: "flex-end",
        },
        titleViewBox: {
            flex: 4,
        },
    });

    const BlankSection = StyleSheet.create({
        toplevelBox: {
            flex: 4,
        },
    });

    return {
        Screen,
        ContentsSection,
        BlankSection,
    };
}
