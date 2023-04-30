import { StyleSheet } from "react-native";
import { UseAuthScreenTitleViewStylesType } from "./types";
import useStyler from "../../../common/hooks/styler/hooks";

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
