import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useNotificationBoxScreenStyles() {
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
