import { StyleSheet } from "react-native";
import useStyler from "../../../hooks/styler/hooks";

export default function useStardustAlertStyles(enterMessage: boolean) {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        modal: {
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: theme.color.specified.lightgrey,
            ...deviceUI.getScreenSize(),
        },
        bgwrapper: {
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: theme.color.specified.lightgrey,
            opacity: 0.6,
            zIndex: -1,
            ...deviceUI.getScreenSize(),
        },
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        alert: {
            width: "80%",
            //height: "20%",
            backgroundColor: theme.color.specified.white,
            borderRadius: deviceUI.moderateScale(15),
            overflow: "hidden",
        },
        header: {
            width: "100%",
            height: deviceUI.moderateScale(40),
        },
        body: {
            width: "100%",
            height: deviceUI.moderateScale(90),
        },
        bottom: {
            width: "100%",
            height: deviceUI.moderateScale(50),
        },
    });

    const header = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            /* alignItems: enterMessage ? "center" : "flex-start",
            paddingLeft: enterMessage ? 0 : deviceUI.moderateScale(10), */
            alignItems: "flex-start",
            paddingLeft: deviceUI.moderateScale(10),
        },
        title: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(16),
            color: theme.color.specified.white,
        },
    });

    const body = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
            paddingVertical: deviceUI.moderateScale(5),
            paddingHorizontal: deviceUI.moderateScale(10),
        },
        message: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(14),
        },
    });

    const bottom = StyleSheet.create({
        container: {
            flex: 1,
            borderTopWidth: 1,
            borderColor: theme.color.series.grey.level1,
            borderBottomLeftRadius: main.alert.borderRadius,
            borderBottomEndtRadius: main.alert.borderRadius,
            flexDirection: "row",
        },
        button: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        buttonOption: {
            backgroundColor: theme.color.series.grey.level1,
            borderRightWidth: 1,
            borderColor: theme.color.series.grey.level1,
        },
        text: {
            fontSize: deviceUI.moderateScale(14),
            fontFamily: theme.font.fontFamily.pretendard.medium,
            color: theme.color.specified.black,
        },
    });

    return {
        main,
        header,
        body,
        bottom,
    };
}
