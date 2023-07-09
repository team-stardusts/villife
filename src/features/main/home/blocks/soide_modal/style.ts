import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { UseHomeSideMoalStylesType } from "./type";

export default function useHomeSideMoalStyles(): UseHomeSideMoalStylesType {
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
            height: deviceUI.screenSize.height,
            width: deviceUI.screenSize.width,
            backgroundColor: theme.colorFamily.lightgrey,
            opacity: 0.6,
            zIndex: -1,
        },
        wrapperTop: { width: deviceUI.getScreenSize().width, height: deviceUI.getScreenSize().height },
        content: {
            backgroundColor: "white",
            position: "absolute",
            height: deviceUI.screenSize.height,
            width: deviceUI.screenSize.width * 0.6,
            right: 0,
        },
        infoContainer: {
            height: deviceUI.screenSize.height * 0.15,
            justifyContent: "flex-end",
        },
        infoWrapper: {
            flexDirection: "row",
            marginLeft: deviceUI.moderateScale(30),
        },
        menuContainer: {
            height: deviceUI.screenSize.height * 0.85,
        },
        menu: {
            flexDirection: "row",
            marginLeft: deviceUI.moderateScale(30),
            paddingTop: deviceUI.moderateScale(20),
            alignItems: "center",
        },
        menuText: {
            marginLeft: deviceUI.moderateScale(10),
        },
    });
}
