import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useMenuButtonStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
        },
        iconBox: {
            paddingRight: deviceUI.moderateScale(15),
        },
        icon: {
            width: deviceUI.moderateScale(70),
            color: theme.colorFamily.black,
        },
    });
    return { main };
}
