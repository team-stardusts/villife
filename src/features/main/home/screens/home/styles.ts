import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useHomeScreenStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: deviceUI.moderateScale(10),
        },
        contentsScrollBox: {
            flex: 1,
        },
    });
}
