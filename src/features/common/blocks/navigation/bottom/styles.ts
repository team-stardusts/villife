import { StyleSheet } from "react-native";
import useStyler from "../../../hooks/styler/hooks";

export default function useNavigationViewBottomStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            height: deviceUI.getPlatform() === "ios" ? "13%" : "10%",
            alignItems: "center",
        },
        menuBox: {
            width: "101%",
            height: "100%",
            position: "absolute",
            bottom: -1,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: theme.color.specified.white,
            borderColor: theme.color.specified.darkgrey,
            borderWidth: deviceUI.moderateScale(1),
            borderBottomWidth: 0,
            borderTopLeftRadius: deviceUI.moderateScale(15),
            borderTopRightRadius: deviceUI.moderateScale(15),
        },
        wrapper: {
            width: "18%",
            alignItems: "center",
        },
        iconBox: {
            flex: deviceUI.getPlatform() === "ios" ? 4 : 5,
            justifyContent: "flex-end",
            paddingBottom: deviceUI.horizontalScale(0.05),
        },
        icon: {
            width: deviceUI.moderateScale(50),
        },
        selected: {
            color: theme.color.specified.black,
        },
        unselected: {
            color: theme.color.specified.lightgrey,
        },
        captionBox: {
            flex: deviceUI.getPlatform() === "ios" ? 6 : 5,
        },
        caption: {
            ...theme.font.researved.h5,
            fontSize: deviceUI.moderateScale(12),
        },
    });
}
