import { StyleSheet } from "react-native";
import useStyler from "../../../hooks/styler/hooks";

export default function useNavigationViewHeaderStyles(crrNavIndex: number) {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "row",
            backgroundColor: theme.color.series.grey.level1,
            borderBottomColor: theme.color.series.grey.level1,
            borderBottomWidth: deviceUI.moderateScale(2),
        },
        box: {
            //flex: 3,
            width: "32%",
        },
        wrapper: {
            //flex: 1,
            height: "100%",
            width: "90%",
            flexDirection: "row",
        },
        titleBox: {
            flex: 0.7,
            justifyContent: "center",
            alignItems: "flex-start",
        },
        iconBox: {
            flex: 0.3,
            //height: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
        },
        icon: {
            width: deviceUI.moderateScale(55),
            color: theme.color.specified.black,
        },
        centerReactFuncBox: {
            width: "36%",
            alignContent: "center",
            justifyContent: "center",
        },
        rightReactFuncBox: {
            width: "32%",
            alignContent: "center",
            justifyContent: "center",
        },
        title: {
            color: theme.color.specified.black,
            paddingLeft: crrNavIndex === 0 ? deviceUI.moderateScale(17) : deviceUI.moderateScale(3),
            marginRight: deviceUI.moderateScale(5),
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(17),
        },
    });
}
