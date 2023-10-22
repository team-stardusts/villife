import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE } from "../../../../common/constants";
import useNavigationViewSpace from "../../../../common/blocks/navigation/service";

export default function useBuildingManagementScreenStyles() {
    const { deviceUI, theme, safetyEdgeSize } = useStyler();
    const window = useNavigationViewSpace({
        applyDefaultHorizontalPadding: false,
        applyDefaultVerticalPadding: false,
        isBottomNavShown: true,
        isHeaderShown: true,
    });

    const filterHeight = deviceUI.getScreenSize().height * 0.11;

    return StyleSheet.create({
        nav: {
            backgroundColor: theme.color.specified.white,
            color: theme.color.series.grey.level1,
        },
        container: {
            flex: 1,
        },
        filterBase: {
            backgroundColor: theme.color.specified.white,
            borderBottomColor: theme.color.series.grey.level1,
            borderTopColor: theme.color.specified.white,
        },
        filter: {
            backgroundColor: theme.color.specified.white,
        },
        selectedFilter: {
            borderColor: theme.color.specified.black,
            backgroundColor: theme.color.specified.white,
        },
        listView: {
            height: deviceUI.select({
                ios: window.height - filterHeight,
                android: window.height - filterHeight - deviceUI.moderateScale(12),
            }),
            paddingHorizontal: deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE),
        },
    });
}
