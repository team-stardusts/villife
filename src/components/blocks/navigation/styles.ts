import { StyleSheet } from "react-native";
import useSystemInfo from "../../../hooks/systeminfo/hooks";
import useAppTheme from "../../../hooks/themes/hooks";

export default function useNavigationViewStyles() {
    const sysinfo = useSystemInfo();
    const theme = useAppTheme();

    const styles = StyleSheet.create({
        toplevelBox: {
            flex: 1,
            backgroundColor: theme.colors.colorFamily.white,
        },
        headerBox: {
            flex: 0.7,
            flexDirection: "row",
            backgroundColor: theme.colors.colorFamily.white,
            borderBottomColor: theme.colors.colorFamily.lightgrey,
            borderBottomWidth: 3,
        },
        headerNavBox: {
            flex: 4,
            flexDirection: "row",
        },
        headerNavIconBox: {
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
        headerNavTitleBox: {
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
        headerReactFuncBox: {
            flex: 6,
            alignContent: "center",
            justifyContent: "center",
        },
        headerTitle: {
            color: theme.colors.colorFamily.black,
        },
        contentsBox: {
            flex: 8.6,
            //backgroundColor: "teal",
        },
        bottomNavBox: {
            flex: 0.7,
            backgroundColor: theme.colors.colorFamily.white,
        },
    });

    return styles;
}
