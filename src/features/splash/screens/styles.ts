import { StyleSheet } from "react-native";
import useStyler from "../../common/hooks/styler/hooks";

export default function useSplashScreenStyles() {
    const { theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
        },
        indicatorBox: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        indicator: {
            //width: deviceUI.moderateScale(150),
            color: theme.colorFamily.blue,
        },
    });
}
