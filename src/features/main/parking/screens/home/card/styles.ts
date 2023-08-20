import { StyleSheet } from "react-native";
import useStyler from "../../../../../common/hooks/styler/hooks";
import useNavigationViewSpace from "../../../../../common/blocks/navigation/service";

export default function useVehicleCardViewStyles(isEditmode?: boolean) {
    const { deviceUI, theme } = useStyler();

    const space = useNavigationViewSpace({
        isHeaderShown: true,
        isBottomNavShown: true,
        applyDefaultHorizontalPadding: true,
        applyDefaultVerticalPadding: false,
    });

    const main = StyleSheet.create({
        container: {
            height: space.height * (isEditmode ? 0.4 : 0.35),
            marginBottom: deviceUI.moderateScale(15),
        },
        contentBox: {
            backgroundColor: theme.color.specified.white,
        },
        wrapper: {
            width: "100%",
            height: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(20),
            paddingTop: deviceUI.moderateScale(15),
        },
        headerContainer: {
            width: "100%",
            height: isEditmode ? "21%" : "25%",
        },
        bodyContainer: {
            width: "100%",
            height: isEditmode ? "70%" : "65%", //deviceUI.moderateScale(isEditmode ? 200 : 150),
        },
        bottomCotainer: {
            width: "100%",
            height: isEditmode ? "9%" : "10%", //deviceUI.moderateScale(10),
        },
    });

    const header = StyleSheet.create({
        conatainer: {
            width: "100%",
            height: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: deviceUI.moderateScale(5),
            borderColor: theme.color.series.grey.level1,
        },
        titleBox: {
            height: "100%",
            justifyContent: "center",
        },
        title: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(30),
        },
        modifyBtn: {
            //width: "15%",
            height: "45%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(10),
            backgroundColor: theme.color.series.grey.level1,
            borderRadius: deviceUI.moderateScale(10),
        },
        modifyBtnTitle: {
            ...theme.font.researved.h5,
        },
    });

    const body = StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
        },
        scrollview: {
            height: "100%",
        },
        noCardContainer: {
            justifyContent: "center",
            alignItems: "center",
        },
        noCardTitleBox: {
            justifyContent: "center",
            alignItems: "center",
            marginBottom: deviceUI.moderateScale(10),
        },
        noCardTitle: {
            marginBottom: deviceUI.moderateScale(5),
            color: theme.color.specified.black,
            ...theme.font.researved.h3,
        },
        noCardSubtitle: {
            color: theme.color.specified.black,
            ...theme.font.researved.h5,
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
            height: "100%",
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
            paddingVertical: deviceUI.moderateScale(15),
        },
        cardRowsWrapper: {
            height: isEditmode ? "74%" : "100%",
            width: "100%",
            justifyContent: "space-between",
        },
        rowWrapper: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        rowKey: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(17),
        },
        rowValue: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(15),
        },
        editBtnsBox: {
            width: "100%",
            height: "26%", //deviceUI.moderateScale(20),
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: deviceUI.moderateScale(10),
            paddingHorizontal: deviceUI.moderateScale(10),
        },
        editBtnWrapper: {
            //width: "100%",
            height: "100%",
        },
        editBtn: {
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(20),
            backgroundColor: theme.color.series.grey.level1,
            borderRadius: deviceUI.moderateScale(10),
        },
        editBtnTitle: {
            color: theme.color.specified.black,
            ...theme.font.researved.h4,
        },
    });

    return {
        main,
        header,
        body,
        bottom,
        card,
    };
}
