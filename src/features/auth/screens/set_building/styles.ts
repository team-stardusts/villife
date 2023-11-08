import { StyleSheet } from "react-native";
import useSystemInfo from "../../../common/hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../common/hooks/themes_legacy/hooks";
import useStyler from "../../../common/hooks/styler/hooks";

export default function useSetBuildingScreenStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: theme.color.specified.white,
        },
    });

    const input = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: deviceUI.moderateScale(20),
        },
        inputBox: {
            height: deviceUI.moderateScale(60),
            marginBottom: deviceUI.moderateScale(7),
        },
        addressBadgeBox: {
            maxWidth: deviceUI.moderateScale(100),
            marginBottom: deviceUI.moderateScale(40),
        },
        roomNumberBadgeBox: {
            maxWidth: deviceUI.moderateScale(60),
            marginBottom: deviceUI.moderateScale(40),
        },
        validBadge: {
            width: deviceUI.moderateScale(14),
            color: theme.color.specified.white,
            backgroundColor: theme.color.specified.blue,
        },
        invalidBadge: {
            color: theme.color.specified.grey,
            backgroundColor: theme.color.specified.lightgrey,
        },
        btnWrapper: {
            flex: 3,
            marginBottom: deviceUI.getScreenSize().width * 0.02,
        },
        btnTitle: {
            color: theme.color.specified.white,
            fontSize: deviceUI.getScreenSize().width * 0.04,
            fontWeight: "700",
        },
    });

    return {
        main,
        input,
    };
}
