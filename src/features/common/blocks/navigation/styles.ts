import { StyleSheet } from "react-native";
import useStyler from "../../hooks/styler/hooks";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE, SCREEN_PADDING_VERTICAL_STANDARD_VALUE } from "../../constants";
import { BodyOptions } from "./types";

export default function useNavigationViewStyles(bodyOptions?: BodyOptions) {
    const { deviceUI, theme } = useStyler();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colorFamily.white,
        },
        bodyBox: {
            flex: 8.3,
            // Default padding은 index.tsx에서 조정
            paddingHorizontal: bodyOptions?.applyDefaultHorizontalPadding
                ? deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE)
                : 0,
            paddingVertical: bodyOptions?.applyDefaultVerticalPadding
                ? deviceUI.moderateScale(SCREEN_PADDING_VERTICAL_STANDARD_VALUE)
                : 0,
        },
        bottomNavBox: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colorFamily.white,
            borderTopColor: theme.colorFamily.lightgrey,
            borderTopWidth: deviceUI.moderateScale(2),
        },
        bottomNavWrapper: {
            width: "18%",
            alignItems: "center",
        },
        bottomNavIconBox: {
            flex: 5,
            justifyContent: "flex-end",
            paddingBottom: deviceUI.horizontalScale(0.05),
        },
        bottomNavCaptionBox: {
            flex: 5,
        },
        bottomNavCaption: {
            ...theme.font.researved.h5,
            fontSize: deviceUI.moderateScale(12),
        },
    });

    return styles;
}
