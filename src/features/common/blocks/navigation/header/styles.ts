import { StyleSheet } from "react-native";
import useStyler from "../../../hooks/styler/hooks";

export default function useNavigationViewHeaderStyles(crrNavIndex: number) {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 0.7,
            flexDirection: "row",
            backgroundColor: theme.colorFamily.white,
            borderBottomColor: theme.colorFamily.lightgrey,
            borderBottomWidth: deviceUI.moderateScale(2),
        },
        box: {
            flex: 3,
            flexDirection: "row",
            justifyContent: "flex-start",
        },
        iconBox: {
            flex: 2.5,
            height: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
        },
        icon: {
            width: deviceUI.moderateScale(65),
            color: theme.colorFamily.black,
        },
        titleBox: {
            flex: 7.5,
            height: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
        },
        centerReactFuncBox: {
            flex: 4,
            alignContent: "center",
            justifyContent: "center",
            //backgroundColor: "red",
        },
        rightReactFuncBox: {
            flex: 3,
            alignContent: "center",
            justifyContent: "center",
        },
        title: {
            color: theme.colorFamily.black,
            paddingLeft: crrNavIndex === 0 ? deviceUI.moderateScale(20) : deviceUI.moderateScale(3),
            marginRight: deviceUI.moderateScale(5),
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            fontSize: deviceUI.moderateScale(17),
        },
    });
}
