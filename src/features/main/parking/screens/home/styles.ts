import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useParkingHomeScreenStyles() {
    const { theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.color.series.grey.level1,
        },
    });
}
