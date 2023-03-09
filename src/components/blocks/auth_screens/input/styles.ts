import { StyleSheet } from "react-native";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import useAppTheme from "../../../../hooks/themes/hooks";
import { UseAuthScreenCommonInputStylesReturnType } from "./types";

export default function useAuthScreenCommonInputStyles(): UseAuthScreenCommonInputStylesReturnType {
    const Theme = useAppTheme();
    const SystemInfo = useSystemInfo();

    return StyleSheet.create({
        inputWrapper: {
            flex: 4,
            marginBottom: SystemInfo.window.width * 0.02,
        },
        inputTitle: {
            //fontFamily: Theme.css.font.universial.fontFamily,
            color: Theme.colors.colorFamily.blue,
            fontSize: SystemInfo.window.width * 0.05,
            fontWeight: "bold",
            paddingBottom: SystemInfo.window.width * 0.01,
        },
    });
}
