import { StyleSheet } from "react-native";
import useSystemInfo from "../../../hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../hooks/themes_legacy/hooks";
import { UseUniversialTextinputStylesProps, UseUniversialTextinputStylesPropsReturnType } from "./types";

export default function useUniversialTextinputStyles(
    props: UseUniversialTextinputStylesProps
): UseUniversialTextinputStylesPropsReturnType {
    const Theme = useAppThemeLegacy();
    const SystemInfo = useSystemInfo();

    return StyleSheet.create({
        input: {
            backgroundColor: Theme.colors.colorFamily.white,
            height: SystemInfo.window.width * 0.08,
            borderRadius: SystemInfo.window.width * 0.02,
            margin: 0,
            paddingVertical: SystemInfo.window.width * 0.01,
            paddingHorizontal: SystemInfo.window.width * 0.02,
            borderColor: props.isFocusing
                ? props.highlightColor ?? Theme.colors.colorFamily.blue
                : props.lowlightColor ?? Theme.colors.colorFamily.lightgrey,
            borderWidth: props.isFocusing ? SystemInfo.window.width * 0.004 : SystemInfo.window.width * 0.002,
        },
    });
}
