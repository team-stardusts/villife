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
            flex: 0.1,
            justifyContent: "flex-end",
            marginBottom: deviceUI.moderateScale(20),
        },
        price: {
            fontFamily: theme.font.fontFamily.pretendard.extraBold,
            fontSize: deviceUI.moderateScale(23),
            color: theme.color.specified.black,
        },
        billContainer: {
            flex: 0.9,
            paddingVertical: deviceUI.moderateScale(10),
        },
        billRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: deviceUI.moderateScale(10),
        },
        billKey: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(17),
            color: theme.color.specified.black,
        },
        billValue: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(16),
            color: theme.color.specified.black,
        },
    });

    return {
        main,
    };
}
