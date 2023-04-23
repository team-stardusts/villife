import { StyleSheet } from "react-native";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../../hooks/themes_legacy/hooks";

export default function useAuthScreenCommonInputStyles() {
    const theme = useAppThemeLegacy();
    const sysInfo = useSystemInfo();

    return StyleSheet.create({
        inputWrapper: {
            flex: 7,
        },
        inputTitle: {
            //fontFamily: Theme.css.font.universial.fontFamily,
            color: theme.colors.colorFamily.blue,
            fontSize: sysInfo.window.width * 0.05,
            fontWeight: "bold",
            paddingBottom: sysInfo.window.width * 0.01,
        },
        validatorWrapper: {
            flex: 3,
            paddingTop: sysInfo.window.width * 0.02,
            flexDirection: "row",
        },
    });
}
