import { StyleSheet } from "react-native";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../../hooks/themes_legacy/hooks";
import { UseAuthScreenTitleViewStylesType } from "./types";
import useStyler from "../../../../hooks/styler/hooks";

export default function useAuthScreenTtitleViewStyles(): UseAuthScreenTitleViewStylesType {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        topLevelBox: {
            flex: 2,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
        },
        textWrapper: {
            textAlign: "left",
            paddingTop: deviceUI.moderateScale(16),
        },
        title: {
            color: theme.colorFamily.blue,
            marginBottom: deviceUI.moderateScale(3),
            ...theme.font.researved.h2,
        },
        subtitle: {
            color: theme.colorFamily.black,
            ...theme.font.researved.h5,
        },
    });
}
