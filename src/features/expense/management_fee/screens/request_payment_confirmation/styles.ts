import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useRequestPaymentConfirmationStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        navContainer: {
            backgroundColor: theme.color.specified.white,
        },
        container: {
            flex: 1,
            marginTop: deviceUI.moderateScale(20),
        },
        row: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: deviceUI.moderateScale(40),
            alignItems: "center",
            marginVertical: deviceUI.moderateScale(15),
        },
        rowKey: {
            fontFamily: theme.font.fontFamily.pretendard.medium,
            color: theme.color.specified.blue,
            fontSize: deviceUI.moderateScale(16),
        },
        rowValue: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            color: theme.color.specified.black,
            fontSize: deviceUI.moderateScale(16),
        },
        iconBtn: {
            position: "absolute",
            right: -deviceUI.moderateScale(35),
            padding: deviceUI.moderateScale(10),
        },
        icon: {
            width: deviceUI.moderateScale(35),
            color: theme.color.specified.black,
        },
    });
}
