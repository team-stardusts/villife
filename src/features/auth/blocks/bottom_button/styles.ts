import { StyleSheet } from "react-native";
import useSystemInfo from "../../../common/hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../common/hooks/themes_legacy/hooks";
import { UseAuthScreenBottonButtonStylesType } from "./types";

export default function useAuthScreenBottomButtonStyles(): UseAuthScreenBottonButtonStylesType {
    const Theme = useAppThemeLegacy();
    const SystemInfo = useSystemInfo();

    return StyleSheet.create({
        topLevelBox: {
            position: "absolute",
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: SystemInfo.window.height * 0.08,
        },
    });
}
