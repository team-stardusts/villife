import { StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";

export default function useImageDetailViewScreenStyles() {
    const { deviceUI, theme } = useStyler();

    const screen = StyleSheet.create({
        topLevelBox: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: theme.colorFamily.white,
        },
    });

    const imageBox = StyleSheet.create({
        image: {
            width: "100%",
            height: "100%",
            resizeMode: "contain",
        },
    });

    return {
        screen,
        imageBox,
    };
}
