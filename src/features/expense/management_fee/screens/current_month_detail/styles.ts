import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import useNavigationViewSpace from "../../../../common/blocks/navigation/service";

export default function useManagementFeeCurrentMonthDetailScreenStyles() {
    const { deviceUI, theme } = useStyler();
    const space = useNavigationViewSpace({
        applyDefaultHorizontalPadding: true,
        applyDefaultVerticalPadding: false,
        isHeaderShown: true,
        isBottomNavShown: true,
    });

    const main = StyleSheet.create({
        navContainer: {
            color: theme.color.specified.white,
        },
        container: {
            flex: 1,
        },
        totalBox: {
            flex: 0.15,
            justifyContent: "center",
            marginTop: deviceUI.moderateScale(24),
            marginLeft: deviceUI.moderateScale(16),
            paddingBottom: deviceUI.moderateScale(16),
            borderBottomWidth: deviceUI.moderateScale(4),
            paddingHorizontal: deviceUI.moderateScale(8),
            borderColor: theme.color.series.grey.level1,
        },
        total: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(30),
            color: theme.color.specified.black,
            marginTop: deviceUI.moderateScale(8),
        },
        headerText: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(14),
            color: theme.color.specified.black,
            paddingLeft: deviceUI.moderateScale(8),
        },
        billBoxTitle: {
            marginTop: deviceUI.moderateScale(16),
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(16),
            color: theme.color.specified.black,
        },
        billBox: {
            marginTop: deviceUI.moderateScale(16),
            paddingBottom: deviceUI.moderateScale(16),
            marginHorizontal: deviceUI.moderateScale(16),
            borderBottomWidth: deviceUI.moderateScale(4),
            paddingHorizontal: deviceUI.moderateScale(8),
            borderColor: theme.color.series.grey.level1,
        },
        termsBox: {
            marginTop: deviceUI.moderateScale(16),
            marginLeft: deviceUI.moderateScale(32),
        },
    });
    const bill = StyleSheet.create({
        row: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: deviceUI.moderateScale(8),
        },
        subitemRow: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: deviceUI.moderateScale(4),
            paddingHorizontal: deviceUI.moderateScale(10),
        },
        key: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(16),
            color: theme.color.specified.black,
        },
        value: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
        },
        subitemKey: {
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.series.grey.level4,
        },
        subitemValue: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(12),
            color: theme.color.series.grey.level4,
        },
    });

    return {
        main,
        card: bill,
    };
}
