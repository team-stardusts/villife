import { StyleSheet } from "react-native";
import useSystemInfo from "../../../hooks/systeminfo/hooks";
import useAppThemeLegacy from "../../../hooks/themes_legacy/hooks";

export default function useNavigationViewStyles() {
    const sysinfo = useSystemInfo();
    const theme = useAppThemeLegacy();

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
            borderBottomWidth: 2,
        },
        headerNavBox: {
            flex: 3,
            flexDirection: "row",
            justifyContent: "flex-start",
        },
        headerNavIconBox: {
            flex: 2.5,
            height: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
        },
        headerNavTitleBox: {
            flex: 7.5,
            height: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
        },
        headerCenterReactFuncBox: {
            flex: 4,
            alignContent: "center",
            justifyContent: "center",
        },
        headerRightReactFuncBox: {
            flex: 3,
            alignContent: "center",
            justifyContent: "center",
        },
        headerTitle: {
            color: theme.colors.colorFamily.black,
            paddingLeft: 20,
            marginRight: 5,
            fontFamily: "Pretendard-Bold",
            fontSize: 20,
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
            borderTopWidth: 2,
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
