import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useMenuButtonStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 0.1,
        },
        iconBox: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(5),
        },
        icon: {
            width: deviceUI.moderateScale(100),
            color: theme.colorFamily.black,
        },
    });
    return { main };
}
