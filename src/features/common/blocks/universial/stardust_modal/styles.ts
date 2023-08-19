import { StyleSheet } from "react-native";
import useStyler from "../../../hooks/styler/hooks";

export default function useStardustModalStyles() {
    const { deviceUI, theme } = useStyler();

    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            //backgroundColor: "rgba(255,255,255,0.6)",
        },
        wrapper: {
            position: "absolute",
            top: 0,
            left: 0,
            height: deviceUI.getScreenSize().height,
            width: deviceUI.getScreenSize().width,
            backgroundColor: theme.color.specified.lightgrey,
            opacity: 0.6,
            zIndex: -1,
        },
        content: {
            width: "88%",
            backgroundColor: "white",
            flex: 0,
            borderRadius: deviceUI.moderateScale(15),
            overflow: "hidden",
            elevation: 5, // Android only
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
        },
        textSection: {
            justifyContent: "center",
            alignItems: "center",
        },
        imageSection: {
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
        },
        childrenSection: {
            justifyContent: "center",
            alignItems: "center",
        },
        title: {
            color: theme.color.specified.black,
            textAlign: "center",
            ...theme.font.researved.h3,
        },
        subtitle: {
            marginTop: deviceUI.moderateScale(5),
            color: theme.color.specified.grey,
            textAlign: "center",
            ...theme.font.researved.h5,
        },
        buttonSection: {
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: deviceUI.moderateScale(5),
        },
        buttonText: {
            ...theme.font.researved.h5,
        },
        button: {
            height: "80%",
            //width: "40%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: deviceUI.moderateScale(8),
            marginHorizontal: deviceUI.moderateScale(10),
        },
    });

    return {
        styles,
        theme,
    };
}
