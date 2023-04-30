import { StyleSheet } from "react-native";
import useSystemInfo from "../../../common/hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../common/hooks/themes_legacy/hooks";
import { UsePermissionScreenViewStylesType } from "./types";

export default function usePermissionScreenViewStyles(): UsePermissionScreenViewStylesType {
    const Theme = useAppThemeLegacy();
    const SystemInfo = useSystemInfo();

    return StyleSheet.create({
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
        },
    });
}
