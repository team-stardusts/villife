import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useConfirmPaymentScreenStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        navContainer: {
            backgroundColor: theme.color.specified.white,
        },
        container: {
            flex: 1,
            paddingHorizontal: deviceUI.moderateScale(10),
        },
        priceContainer: {
            justifyContent: "flex-end",
            paddingVertical: deviceUI.moderateScale(40),
            borderBottomWidth: 1,
            borderBottomColor: theme.color.specified.lightgrey,
        },
        price: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(27),
            color: theme.color.specified.black,
        },
        billContainer: {
            paddingVertical: deviceUI.moderateScale(10),
        },
        billRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: deviceUI.moderateScale(10),
        },
        billKey: {
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(16),
            color: theme.color.specified.black,
        },
        billValue: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(14),
            color: theme.color.specified.black,
        },
        refundPolicy: {
            marginTop: deviceUI.moderateScale(10),
        },
    });

    return {
        main,
    };
}
