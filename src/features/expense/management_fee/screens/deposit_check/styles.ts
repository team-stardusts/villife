import { Platform, StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE } from "../../../../common/constants";
import useNavigationViewSpace from "../../../../common/blocks/navigation/service";

export default function useMFDepositCheckScreenStyles() {
    const { deviceUI, theme, safetyEdgeSize } = useStyler();
    const window = useNavigationViewSpace({
        applyDefaultHorizontalPadding: false,
        applyDefaultVerticalPadding: false,
        isBottomNavShown: true,
        isHeaderShown: true,
    });

    const filterHeight = deviceUI.getScreenSize().height * 0.11;

    return StyleSheet.create({
        nav: {},
        container: {
            flex: 1,
        },
        scrollView: {
            width: "100%",
            paddingHorizontal: deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE),
            paddingBottom: deviceUI.moderateScale(10),
        },
    });
}
