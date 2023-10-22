import { StyleSheet } from "react-native";
import useStyler from "../../../../../../common/hooks/styler/hooks";

export default function useLayoutSelectorStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            //paddingRight: deviceUI.moderateScale(10),
        },
        pressable: {
            height: "100%",
            width: "45%",
            justifyContent: "center",
            alignItems: "center",
        },
        selectedIcon: {
            color: theme.color.specified.black,
            width: deviceUI.moderateScale(45),
        },
    });
}
