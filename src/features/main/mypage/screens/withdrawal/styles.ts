import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useWithdrawalScreenStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        nav: {
            color: theme.color.specified.white,
        },
        container: {
            flex: 1,
            backgroundColor: theme.color.specified.white,
        },
        inputWrapper: {
            marginTop: deviceUI.moderateScale(50),
        },
    });
}
