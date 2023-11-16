import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useWireAmountManuallyStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        navContainer: {
            backgroundColor: theme.color.specified.white,
        },
        container: {
            flex: 1,
        },
        billContainer: {
            marginTop: deviceUI.moderateScale(30),
            marginLeft: deviceUI.moderateScale(24),
        },
        residenceInfoBox: {},
        residenceInfo: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            color: theme.color.specified.black,
            fontSize: deviceUI.moderateScale(14),
        },
        paymentContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: deviceUI.moderateScale(10),
        },
        amountBox: {},
        amount: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            color: theme.color.specified.black,
            fontSize: deviceUI.moderateScale(26),
        },
        detailBtn: {
            paddingVertical: deviceUI.moderateScale(4),
            paddingHorizontal: deviceUI.moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.color.series.grey.level1,
            borderRadius: deviceUI.moderateScale(10),
        },
        detailBtnText: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            color: theme.color.specified.black,
            fontSize: deviceUI.moderateScale(13),
        },
        bankListContainer: {
            marginTop: deviceUI.moderateScale(20),
        },
        headerBox: {
            borderBottomWidth: deviceUI.moderateScale(5),
            borderBottomColor: theme.color.series.grey.level1,
            paddingLeft: deviceUI.moderateScale(13),
            paddingBottom: deviceUI.moderateScale(10),
        },
        header: {
            fontFamily: theme.font.fontFamily.pretendard.medium,
            color: theme.color.specified.black,
            fontSize: deviceUI.moderateScale(15),
        },
        scroll: {
            marginTop: deviceUI.moderateScale(20),
        },
    });
}
