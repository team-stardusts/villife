import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useMessageSelectorStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
        },
        iconBox: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(5),
        },
        icon: {
            width: deviceUI.moderateScale(50),
            color: theme.colorFamily.white,
        },
    });

    const modal = StyleSheet.create({
        container: {
            height: deviceUI.getScreenSize().height * 0.3,
            justifyContent: "center",
            alignItems: "center",
        },
        wrapper: {
            height: deviceUI.getScreenSize().height * 0.15,
        },
    });

    const modalElement = StyleSheet.create({
        container: {
            height: "50%",
            width: "100%",
        },
        wrapper: {
            height: "100%",
            width: "100%",
            flexDirection: "row",
        },
        iconBox: {
            flex: 2,
            justifyContent: "center",
            alignItems: "flex-end",
            paddingRight: deviceUI.moderateScale(10),
        },
        textBox: {
            flex: 8,
            justifyContent: "center",
            alignItems: "flex-start",
            paddingHorizontal: deviceUI.moderateScale(5),
        },
        icon: {
            width: deviceUI.moderateScale(50),
            color: theme.colorFamily.black,
        },
        text: {
            fontWeight: "bold",
            ...theme.font.researved.h4,
        },
    });

    return {
        main,
        modal,
        modalElement,
    };
}
