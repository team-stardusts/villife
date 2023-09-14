import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function usePaymentCommonScreenStyles() {
    const { deviceUI, theme } = useStyler();

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            bottom: 0,
            backgroundColor: theme.color.specified.white,
        },
        btn: {
            height: "10%",
            backgroundColor: "teal",
            justifyContent: "center",
            alignItems: "center",
        },
        title: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(26),
            color: theme.color.specified.blue,
            marginLeft: deviceUI.moderateScale(24),
            marginTop: deviceUI.moderateScale(16),
        },
        navViewBackgroundColor: {
            color: theme.color.specified.white,
        },
    });

    return styles;
}
