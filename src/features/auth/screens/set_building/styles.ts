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
            backgroundColor: theme.colorFamily.white,
        },
        screenWrapper: {
            flex: 1,
            paddingHorizontal: deviceUI.getScreenSize().width * 0.06,
        },
        contentsWrapper: {
            flex: 8,
        },
    });

    const input = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: deviceUI.moderateScale(20),
        },
        inputBox: {
            height: deviceUI.moderateScale(30),
            marginBottom: deviceUI.moderateScale(30),
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
            color: theme.colorFamily.white,
            backgroundColor: theme.colorFamily.blue,
        },
        invalidBadge: {
            color: theme.colorFamily.grey,
            backgroundColor: theme.colorFamily.lightgrey,
        },
        btnWrapper: {
            flex: 3,
            marginBottom: deviceUI.getScreenSize().width * 0.02,
        },
        btnTitle: {
            color: theme.colorFamily.white,
            fontSize: deviceUI.getScreenSize().width * 0.04,
            fontWeight: "700",
        },
    });

    return {
        main,
        input,
    };
}
