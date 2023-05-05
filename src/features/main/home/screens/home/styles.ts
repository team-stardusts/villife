import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import {
    SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE,
    SCREEN_PADDING_VERTICAL_STANDARD_VALUE,
} from "../../../../common/constants";

export default function useHomeScreenStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        toplevelBox: {
            flex: 1,
            backgroundColor: theme.colorFamily.white,
        },
        contentsScrollBox: {
            flex: 1,
            paddingHorizontal: deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE),
            paddingVertical: deviceUI.moderateScale(SCREEN_PADDING_VERTICAL_STANDARD_VALUE),
        },
    });
}
