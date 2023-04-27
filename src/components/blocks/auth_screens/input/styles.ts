import { StyleSheet } from "react-native";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../../hooks/themes_legacy/hooks";
import useStyler from "../../../../hooks/styler/hooks";

export default function useAuthScreenCommonInputStyles() {
    const sysInfo = useSystemInfo();
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        inputWrapper: {
            flex: 7,
        },
        inputTitle: {
            //fontFamily: Theme.css.font.universial.fontFamily,
            color: theme.colorFamily.blue,
            fontWeight: "bold",
            paddingBottom: deviceUI.moderateScale(3),
            ...theme.font.researved.h4,
        },
        validatorWrapper: {
            flex: 3,
            paddingTop: deviceUI.moderateScale(4),
            flexDirection: "row",
        },
    });
}
