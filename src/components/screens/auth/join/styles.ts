import { StyleSheet } from "react-native";
import useSystemInfo from "../../../../hooks/internal/systeminfo/hooks";
import useAppTheme from "../../../../hooks/internal/themes/hooks";
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
    });
    const PageTitleSection = StyleSheet.create({
        topLevelBox: {
            flex: 1,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
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
            backgroundColor: Theme.colors.colorFamily.blue,
        }
    });

    const BlankSection = StyleSheet.create({
        topLevelBox: {
            flex: 1,
            backgroundColor: Theme.colors.colorFamily.red,
        }
    });

    return {
        Page, 
        PageTitleSection,
        JoinInputSection,
        BlankSection,
    }
}