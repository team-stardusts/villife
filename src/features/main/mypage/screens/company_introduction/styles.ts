import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import useNavigationViewSpace from "../../../../common/blocks/navigation/service";

export default function useCompanyIntroductionScreenStyles() {
    const { deviceUI, theme } = useStyler();
    const space = useNavigationViewSpace({
        applyDefaultHorizontalPadding: false,
        applyDefaultVerticalPadding: false,
        isBottomNavShown: true,
        isHeaderShown: true,
    });

    const main = StyleSheet.create({
        navContainer: {
            color: theme.color.specified.white,
        },
        container: {
            width: "100%",
            height: space.height * 0.65,
            marginTop: deviceUI.moderateScale(48),
        },
        childrenSection: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: deviceUI.moderateScale(8),
            paddingHorizontal: deviceUI.moderateScale(16),
        },
        leftText: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(18),
            color: theme.color.specified.blue,
        },
        rightText: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(22),
            color: theme.color.specified.black,
        },
        rightSmallText: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(14),
            color: theme.color.specified.black,
        },
    });
    return {
        main,
    };
}
