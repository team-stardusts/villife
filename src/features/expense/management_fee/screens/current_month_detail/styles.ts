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
            fontFamily: theme.font.fontFamily.pretendard.extraBold,
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
            mfontFamily: theme.font.fontFamily.pretendard.regular,
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
        termsBox: { marginTop: deviceUI.moderateScale(16), marginLeft: deviceUI.moderateScale(32) },
        selector: {
            position: "absolute",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: deviceUI.moderateScale(30),
            top: -deviceUI.moderateScale(50),
            right: 0,
        },
        selectorText: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
            marginRight: deviceUI.moderateScale(5),
        },
        selectorIcon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
        },
    });
    const card = StyleSheet.create({
        cardRow: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: deviceUI.moderateScale(8),
        },
        cardRowKey: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(18),
            color: theme.color.specified.black,
        },
        cardRowValue: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(16),
            color: theme.color.specified.black,
        },
    });

    return {
        main,
        card,
    };
}
