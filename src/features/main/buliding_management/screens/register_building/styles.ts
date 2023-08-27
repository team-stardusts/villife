import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useBuildingManagementScreenStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        nav: {
            backgroundColor: theme.color.specified.white,
            color: theme.color.series.grey.level1,
        },
        container: {
            flex: 1,
        },
    });
}
