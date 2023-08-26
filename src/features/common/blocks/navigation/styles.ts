import { StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE, SCREEN_PADDING_VERTICAL_STANDARD_VALUE } from "../../constants";
import { BodyOptions } from "./types";

export default function useNavigationViewStyles(bodyOptions?: BodyOptions) {
    const { deviceUI, theme } = useStyler();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.color.series.grey.level1,
        },
        HeaderConatiner: {
            flex: 0.7,
        },
        bodyContainer: {
            flex: 8.3,
            // Default padding은 index.tsx에서 조정
            paddingHorizontal: bodyOptions?.applyDefaultHorizontalPadding
                ? deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE)
                : 0,
            paddingVertical: bodyOptions?.applyDefaultVerticalPadding
                ? deviceUI.moderateScale(SCREEN_PADDING_VERTICAL_STANDARD_VALUE)
                : 0,
        },
        bottomContainer: {
            flex: 1,
        },
    });

    return styles;
}
