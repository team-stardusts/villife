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
            flex: 8.3,
            //backgroundColor: "teal",
        },
        bottomNavBox: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.colorFamily.white,
            borderTopColor: theme.colors.colorFamily.lightgrey,
            borderTopWidth: 3,
        },
        bottomNavWrapper: {
            width: "18%",
            alignItems: "center",
        },
        bottomNavIconBox: {
            flex: 5,
            justifyContent: "flex-end",
            paddingBottom: sysinfo.window.height * 0.005,
        },
        bottomNavCaptionBox: {
            flex: 5,
        },
        bottomNavCaption: {
            fontSize: sysinfo.window.width * 0.031,
        },
    });

    return styles;
}
