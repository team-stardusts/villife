import { StyleSheet } from "react-native";
import useStyler from "../../../../../common/hooks/styler/hooks";
import useNavigationViewSpace from "../../../../../common/blocks/navigation/service";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE } from "../../../../../common/constants";

export default function useVehicleCardViewStyles() {
    const { deviceUI, theme } = useStyler();

    const innerPadding = deviceUI.moderateScale(40);
    const screenPadding = deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE) * 2;
    const cardWidth: number = deviceUI.getScreenSize().width - (screenPadding + innerPadding);

    const space = useNavigationViewSpace({
        isHeaderShown: true,
        isBottomNavShown: true,
        applyDefaultHorizontalPadding: true,
        applyDefaultVerticalPadding: false,
    });

    const main = StyleSheet.create({
        container: {
            //height: space.height * 0.25,
            width: "100%",
            marginBottom: deviceUI.moderateScale(15),
        },
        wrapper: {
            //height: space.height * 0.25,
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
        },
        bodyContainer: {},
        btncomboContainer: {
            width: "100%",
        },
        bottomCotainer: {
            width: "100%",
        },
    });

    const body = StyleSheet.create({
        container: {
            width: "100%",
        },
        scrollview: {},
        card: {
            width: cardWidth,
        },
        additionalCardConatiner: {
            width: cardWidth,
            minHeight: deviceUI.moderateScale(80),
            justifyContent: "center",
            alignItems: "center",
            marginBottom: deviceUI.moderateScale(10),
        },
        waitingTitle: {
            marginBottom: deviceUI.moderateScale(10),
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(16),
            color: theme.color.specified.black,
        },
        waitingSubtitle: {
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(14),
            color: theme.color.specified.lightblue,
        },
        noCardTitle: {
            marginBottom: deviceUI.moderateScale(10),
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(16),
            color: theme.color.specified.black,
        },
        noCardSubtitle: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(14),
            color: theme.color.specified.blue,
        },
        registerIcon: {
            color: theme.color.specified.black,
            width: deviceUI.moderateScale(80),
        },
    });

    const bottom = StyleSheet.create({
        cotainer: {
            justifyContent: "center",
            alignItems: "center",
            height: deviceUI.moderateScale(15),
            width: "100%",
        },
        indicator: {
            color: theme.color.specified.black,
            width: deviceUI.moderateScale(6),
        },
        indicatorDeactive: {
            color: theme.color.specified.lightgrey,
        },
    });

    const card = StyleSheet.create({
        card: {
            height: "100%",
            overflow: "hidden",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: deviceUI.moderateScale(5),
        },
        cardRowsWrapper: {
            width: "100%",
            justifyContent: "space-between",
        },
        rowWrapper: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: deviceUI.moderateScale(3),
        },
        rowKey: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(15),
        },
        rowValue: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(15),
        },
    });

    const btncombo = StyleSheet.create({
        container: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: deviceUI.moderateScale(10),
        },
        editBtn: {
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: deviceUI.moderateScale(7),
            paddingHorizontal: deviceUI.moderateScale(17),
            backgroundColor: theme.color.series.grey.level1,
            borderRadius: deviceUI.moderateScale(10),
        },
        editBtnTitle: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(14),
            color: theme.color.specified.black,
        },
    });

    return {
        main,
        body,
        bottom,
        card,
        btncombo,
    };
}
