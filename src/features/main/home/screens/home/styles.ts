import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useHomeScreenStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        toplevelBox: {
            flex: 1,
            backgroundColor: theme.colorFamily.white,
        },
        contentsScrollBox: {
            flex: 1,
        },
    });
}
