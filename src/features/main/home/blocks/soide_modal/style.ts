import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useHomeSideMoalStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
        },
        wrapper: {
            position: "absolute",
            top: 0,
            right: 0,
            height: deviceUI.getScreenSize().height,
            width: deviceUI.getScreenSize().width,
            backgroundColor: theme.color.specified.lightgrey,
            opacity: 0.6,
            zIndex: -1,
        },
        wrapperTop: { width: deviceUI.getScreenSize().width, height: deviceUI.getScreenSize().height },
        content: {
            backgroundColor: theme.color.specified.white,
            position: "absolute",
            height: deviceUI.getScreenSize().height,
            width: deviceUI.getScreenSize().width * 0.6,
            right: 0,
        },
        infoContainer: {
            height: deviceUI.getScreenSize().height * 0.15,
            justifyContent: "flex-end",
        },
        infoWrapper: {
            flexDirection: "row",
            marginLeft: deviceUI.moderateScale(30),
        },
        infoText: {
            marginLeft: deviceUI.moderateScale(10),
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(16),
            color: theme.color.specified.black,
        },
        menuContainer: {
            marginTop: deviceUI.moderateScale(15),
        },
        menu: {
            flexDirection: "row",
            marginLeft: deviceUI.moderateScale(30),
            marginVertical: deviceUI.moderateScale(10),
            alignItems: "center",
        },
        menuIconBox: {
            width: "15%",
            justifyContent: "center",
            alignItems: "center",
        },
        menuText: {
            marginLeft: deviceUI.moderateScale(10),
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
        },
    });
}
