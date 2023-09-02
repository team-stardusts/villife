import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import useNavigationViewSpace from "../../../../common/blocks/navigation/service";

export default function useTenantDetailScreenStyles() {
    const { deviceUI, theme } = useStyler();
    const space = useNavigationViewSpace({
        applyDefaultHorizontalPadding: true,
        applyDefaultVerticalPadding: false,
        isHeaderShown: true,
        isBottomNavShown: true,
    });

    return StyleSheet.create({
        nav: {
            backgroundColor: theme.color.series.grey.level1,
            //color: theme.color.series.grey.level1,
        },
        container: {
            flex: 1,
        },
        tenantInfoContainer: {
            marginBottom: deviceUI.moderateScale(15),
        },
        tenantVehicleInfoConainer: {
            //height: "30%",
        },
        tenantInfo: {
            minHeight: space.height * 0.4,
            justifyContent: "center",
        },
        cardRow: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: deviceUI.moderateScale(5),
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
}
