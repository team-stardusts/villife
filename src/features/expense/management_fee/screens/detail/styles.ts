import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useManagementFeeDetailScreenStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        navContainer: {
            color: theme.color.specified.white,
        },
        container: {
            flex: 1,
        },
        totalBox: {
            flex: 0.15,
            justifyContent: "center",
        },
        total: {
            fontFamily: theme.font.fontFamily.pretendard.extraBold,
            fontSize: deviceUI.moderateScale(30),
            color: theme.color.specified.black,
        },
        billBox: {
            flex: 0.85,
        },
        selector: {
            position: "absolute",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: deviceUI.moderateScale(30),
            top: -deviceUI.moderateScale(50),
            right: 0,
        },
        selectorText: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
            marginRight: deviceUI.moderateScale(5),
        },
        selectorIcon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
        },
    });

    return {
        main,
    };
}
