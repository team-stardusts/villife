import { StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";

export default function useBuildingInfoScreenStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        nav: {
            backgroundColor: theme.color.series.grey.level1,
        },
        container: {
            flex: 1,
            //backgroundColor: theme.color.specified.white,
        },
        dummy: {
            paddingBottom: deviceUI.moderateScale(20),
        },
    });
}
