import { StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";

export default function useBuildingInfoScreenScreenStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        nav: {
            backgroundColor: theme.color.specified.white,
        },
        container: {
            flex: 1,
            backgroundColor: theme.color.specified.white,
        },
    });
}
