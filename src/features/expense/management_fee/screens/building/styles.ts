import { Platform, StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE } from "../../../../common/constants";
import useNavigationViewSpace from "../../../../common/blocks/navigation/service";

export default function useBuildingMFHistoryScreenStyles() {
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
        filterBase: {
            backgroundColor: theme.color.series.grey.level1,
            borderBottomColor: theme.color.series.grey.level2,
        },
        filter: {
            backgroundColor: theme.color.series.grey.level1,
        },
        selectedFilter: {
            borderColor: theme.color.specified.black,
            backgroundColor: theme.color.specified.white,
        },
        wrapper: {
            height: deviceUI.select({
                ios: window.height - filterHeight,
                android: window.height - filterHeight - deviceUI.moderateScale(12),
            }),
            paddingHorizontal: deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE),
        },
        fcBtnWrapper: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: deviceUI.moderateScale(10),
        },
        fcBtn: {
            width: "48%",
            alignItems: "center",
            borderRadius: deviceUI.moderateScale(10),
            paddingVertical: deviceUI.moderateScale(8),
            backgroundColor: theme.color.specified.white,
        },
        fcTxt: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.specified.black,
        },
        scrollView: {
            width: "100%",
            paddingBottom: deviceUI.moderateScale(10),
        },
    });
}
