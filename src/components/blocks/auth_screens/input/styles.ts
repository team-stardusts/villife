import { StyleSheet } from "react-native";
import useSystemInfo from "../../../../hooks/systeminfo/hooks";
import useAppTheme from "../../../../hooks/themes/hooks";

export default function useAuthScreenCommonInputStyles() {
    const theme = useAppTheme();
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
