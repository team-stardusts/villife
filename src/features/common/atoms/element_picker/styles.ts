import { StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";

export default function useElementPickerStyles() {
    const { theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            height: "100%",
        },
        focused: {
            color: theme.color.specified.black,
        },
        unfocused: {
            color: theme.color.specified.grey,
        },
    });

    const node = StyleSheet.create({
        container: {
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
        node: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
        },
    });

    return {
        main,
        node,
    };
}
