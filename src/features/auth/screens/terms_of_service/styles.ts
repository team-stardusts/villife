import { StyleSheet } from "react-native";
import useSystemInfo from "../../../common/hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../common/hooks/themes_legacy/hooks";
import useStyler from "../../../common/hooks/styler/hooks";

export default function useTermsOfServiceScreenStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
        },
    });

    const input = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: deviceUI.moderateScale(24),
        },
        horizontalLine: {
            paddingHorizontal: deviceUI.moderateScale(16),
            height: deviceUI.moderateScale(1),
            backgroundColor: theme.color.specified.blue,
            marginBottom: deviceUI.moderateScale(16),
        },
        lefrBox: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        barSort: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(8),
            marginBottom: deviceUI.moderateScale(16),
        },
        descriptionMessage: {
            fontWeight: "bold",
            fontSize: deviceUI.moderateScale(16),
            marginLeft: deviceUI.moderateScale(16),
        },
        icon: {
            color: theme.color.series.grey.level5,
            width: deviceUI.moderateScale(45),
        },
    });

    const blank = StyleSheet.create({
        container: {
            flex: 2,
        },
    });

    return {
        main,
        input,
        blank,
    };
}
