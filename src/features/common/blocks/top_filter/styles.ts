import { StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";

export default function useScreenTopFilterStyles() {
    const { theme, deviceUI } = useStyler();

    return StyleSheet.create({
        container: {
            width: "100%",
            height: deviceUI.getScreenSize().height * 0.11,
            backgroundColor: theme.color.specified.white,
            borderColor: theme.color.series.grey.level1,
        },
        menu: {
            flex: 5,
        },
        filter: {
            flex: 5,
            backgroundColor: theme.color.series.grey.level1,
            flexDirection: "row",
        },
        filterComponent: {
            flex: 8,
        },
        sideComponent: {
            flex: 2,
        },
    });
}
