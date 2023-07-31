import { StyleSheet } from "react-native";
import { UseMyPageHomeScreenStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useMyPageHomeScreenStyles(): UseMyPageHomeScreenStylesType {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        topLevelBox: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: theme.color.specified.white,
        },
        infoContainer: {
            width: "100%",
            height: deviceUI.getScreenSize().height * 0.2,
            backgroundColor: theme.color.specified.blue,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
        },
        leftContainer: { alignItems: "center", paddingLeft: deviceUI.moderateScale(30) },
        humanIconSize: { width: deviceUI.moderateScale(85) },
        buttonContainer: {
            marginTop: deviceUI.moderateScale(10),
            backgroundColor: theme.color.specified.lightblue,
            paddingVertical: deviceUI.moderateScale(5),
            paddingHorizontal: deviceUI.moderateScale(10),
            borderRadius: deviceUI.moderateScale(8),
        },
        buttonContainerText: { color: theme.color.specified.white },
        rightContainer: {
            alignItems: "flex-end",
            height: deviceUI.getScreenSize().height * 0.15,
            justifyContent: "space-around",
            paddingRight: deviceUI.moderateScale(30),
        },
        rightContainerTitleText: {
            color: theme.color.specified.white,
            fontFamily: theme.font.researved.h3.fontFamily,
            fontSize: theme.font.researved.h3.fontSize,
        },
        rightContainerSubText: {
            color: theme.color.specified.white,
            fontFamily: theme.font.researved.h4.fontFamily,
            fontSize: theme.font.researved.h5.fontSize,
        },
        serviceContainer: { marginLeft: deviceUI.getScreenSize().width * 0.05 },
        serviceContainerText: {
            color: theme.color.specified.black,
            fontFamily: theme.font.researved.h3.fontFamily,
            fontSize: theme.font.researved.h3.fontSize,
            marginTop: deviceUI.moderateScale(30),
        },
    });
}
