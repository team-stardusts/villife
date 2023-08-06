import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useBuildingTenantFilterStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
        },
        menuContainer: {
            flex: 0.5,
            flexDirection: "row",
            borderBottomColor: theme.color.series.grey.level1,
            borderBottomWidth: 2,
        },
        filterContainer: {
            flex: 0.5,
            flexDirection: "row",
        },
        menuWrapper: {
            height: "100%",
            width: "25%",
            justifyContent: "center",
            alignItems: "center",
        },
        menu: {
            height: "100%",
            borderBottomColor: theme.color.specified.black,
            borderBottomWidth: 2,
            justifyContent: "center",
            alignItems: "center",
        },
        menuName: {
            color: theme.color.specified.lightgrey,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(15),
        },
        menuSelected: {
            borderBottomColor: theme.color.specified.black,
            borderBottomWidth: 2,
            color: theme.color.specified.black,
        },
        filterWrapper: {
            flex: 0.8,
        },
        layoutSelectorWrapper: {
            flex: 0.2,
        },
        layoutSelector: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            paddingRight: deviceUI.moderateScale(10),
        },
        layoutSelectionBtn: {
            height: "100%",
            width: "45%",
            justifyContent: "center",
            alignItems: "center",
        },
        layoutSelectionIcon: {
            color: theme.color.specified.lightgrey,
            width: deviceUI.moderateScale(40),
        },
        layoutSelectionIconSelected: {
            color: theme.color.specified.black,
            width: deviceUI.moderateScale(45),
        },
    });

    return {
        main,
    };
}
