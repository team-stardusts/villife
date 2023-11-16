import { StyleSheet } from "react-native";
import useStyler from "../../../../../../common/hooks/styler/hooks";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE } from "../../../../../../common/constants";

export default function useUserMFViewStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        container: {
            flex: 1,
        },
        wrapper: {
            paddingHorizontal: deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE),
        },
    });

    const managementFee = StyleSheet.create({
        container: {
            marginTop: deviceUI.moderateScale(10),
            height: deviceUI.moderateScale(150),
        },
        contentBox: {
            color: theme.color.specified.white,
        },
        contentWrapper: {
            height: "100%",
            width: "100%",
            paddingHorizontal: deviceUI.moderateScale(20),
        },
        header: {
            flex: 3,
            width: "100%",
            justifyContent: "flex-end",
        },
        headerText: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.specified.black,
        },
        body: {
            flex: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: deviceUI.moderateScale(20),
        },
        managementFeeBox: {
            flexDirection: "row",
            alignItems: "center",
        },
        managementFee: {
            fontFamily: theme.font.fontFamily.pretendard.extraBold,
            fontSize: deviceUI.moderateScale(25),
            color: theme.color.specified.black,
        },
        paymentBtn: {
            borderRadius: deviceUI.moderateScale(20),
            backgroundColor: theme.color.series.grey.level1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: deviceUI.moderateScale(10),
            paddingVertical: deviceUI.moderateScale(5),
        },
        paymentText: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(12),
            color: theme.color.specified.black,
        },
    });

    const bill = StyleSheet.create({
        container: {
            //height: deviceUI.moderateScale(150),
            marginTop: deviceUI.moderateScale(15),
        },
        contentBox: {
            color: theme.color.specified.white,
        },
        contentWrapper: {
            height: "100%",
            width: "100%",
            paddingHorizontal: deviceUI.moderateScale(20),
        },
        header: {
            width: "100%",
            paddingVertical: deviceUI.moderateScale(15),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        headerText: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(20),
            color: theme.color.specified.black,
        },
        body: {
            width: "100%",
            paddingVertical: deviceUI.moderateScale(15),
        },
        bodyRow: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: deviceUI.moderateScale(10),
        },
        bodyRowKey: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(14),
            color: theme.color.specified.black,
        },
        bodyRowValue: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(14),
            color: theme.color.specified.black,
        },
        detailBtn: {
            borderRadius: deviceUI.moderateScale(20),
            backgroundColor: theme.color.series.grey.level1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: deviceUI.moderateScale(10),
            paddingVertical: deviceUI.moderateScale(5),
        },
        detailText: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(12),
            color: theme.color.specified.black,
        },
    });

    const history = StyleSheet.create({
        container: {
            marginTop: deviceUI.moderateScale(20),
        },
        contentBox: {
            color: theme.color.specified.white,
        },
        pressable: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: deviceUI.moderateScale(20),
            paddingVertical: deviceUI.moderateScale(10),
        },
        text: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(22),
            color: theme.color.specified.black,
        },
        icon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
        },
    });

    const managementFeeStatus = StyleSheet.create({
        container: {
            marginTop: deviceUI.moderateScale(20),
            //height: deviceUI.moderateScale(65),
        },
        managementFeeContainer: {
            height: deviceUI.moderateScale(70),
            width: deviceUI.moderateScale(70),
            marginLeft: deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE / 1.5),
        },
        contentBox: {
            color: theme.color.specified.white,
        },
        contentWrapper: {
            height: "100%",
            width: "100%",
            paddingHorizontal: deviceUI.moderateScale(7),
        },
        monthBox: {
            height: "50%",
            justifyContent: "center",
            alignItems: "center",
        },
        month: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.specified.black,
        },
        btnBox: {
            height: "50%",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
        },
        iconBox: {
            width: "100%",
            height: "70%",
            justifyContent: "center",
            alignItems: "center",
        },
        checkIcon: {
            width: deviceUI.moderateScale(30),
            color: theme.color.specified.green,
        },
        xIcon: {
            width: deviceUI.moderateScale(45),
            color: theme.color.status.danger,
        },
        paymentBtn: {
            marginTop: deviceUI.moderateScale(3),
            paddingHorizontal: deviceUI.moderateScale(8),
            paddingVertical: deviceUI.moderateScale(3),
            borderRadius: deviceUI.moderateScale(20),
            backgroundColor: theme.color.specified.blue,
            justifyContent: "center",
            alignItems: "center",
        },
        paymentBtnText: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(10),
            color: theme.color.specified.white,
        },
    });

    return {
        main,
        managementFee,
        bill,
        history,
        managementFeeStatus,
    };
}
