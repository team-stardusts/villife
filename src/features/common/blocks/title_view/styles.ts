import { StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";

export default function useScreenTtitleViewStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: deviceUI.moderateScale(18),
        },
        titleBox: {
            flex: 1.8,
            //alignItems: "center",
            justifyContent: "center",
            textAlign: "left",
            paddingTop: deviceUI.moderateScale(16),
        },
        title: {
            color: theme.color.specified.blue,
            marginBottom: deviceUI.moderateScale(3),
            ...theme.font.researved.h2,
        },
        subtitle: {
            color: theme.color.specified.black,
            ...theme.font.researved.h5,
        },
        children: {
            flex: 8.2,
        },
    });
}
