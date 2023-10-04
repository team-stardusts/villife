import { StyleSheet } from "react-native";
import useStyler from "../../common/hooks/styler/hooks";

export default function useSplashScreenStyles() {
    const { theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.color.specified.lightblue,
        },
        indicatorBox: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        villifeIcon: {
            //width: deviceUI.moderateScale(150),
            color: theme.color.specified.blue,
        },
        spinner: {
            color: theme.color.series.grey.level2,
        },
    });
}
