import { StyleSheet } from "react-native";
import { ComplaintHomeScreenStylesType } from "./types";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useComplaintHomeSecreenStyle(): ComplaintHomeScreenStylesType {
    const { deviceUI, theme } = useStyler();

    const Style = StyleSheet.create({
        topLevelBox: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: theme.colorFamily.white,
        },
        FAQContainer: {
            width: "100%",
            height: deviceUI.screenSize.height * 0.07,
            backgroundColor: theme.colorFamily.lightblue,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            borderRadius: deviceUI.moderateScale(10),
        },
        questionMarkIconSize: {
            width: deviceUI.moderateScale(45),
        },
        FAQTextContainer: {
            height: "100%",
            justifyContent: "center",
            marginLeft: deviceUI.moderateScale(10),
        },
        FAQTitle: {
            fontSize: deviceUI.moderateScale(14),
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.white,
        },
        FAQContent: {
            fontSize: deviceUI.moderateScale(10),
            fontFamily: theme.font.fontFamilies.pretendard.regular,
            color: theme.colorFamily.white,
        },

        menuContainer: {
            width: "100%",
            height: deviceUI.screenSize.height * 0.07,
            alignItems: "center",
            flexDirection: "row",
        },
        menuTitleBox: {
            alignItems: "center",
            flexDirection: "row",
            zIndex: 5,
        },
        menuTitleText: {
            fontSize: deviceUI.moderateScale(24),
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.black,
        },
        vectorIconSize: {
            height: deviceUI.moderateScale(18),
        },
        registerButtonWrapper: {
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "flex-end",
        },
        registerButton: {
            height: deviceUI.moderateScale(26),
            width: deviceUI.moderateScale(80),
            backgroundColor: theme.colorFamily.lightblue,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: deviceUI.moderateScale(8),
        },
        registerButtonText: {
            marginLeft: "5%",
            fontSize: deviceUI.moderateScale(12),
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.white,
        },
        plusIconSize: {
            width: deviceUI.moderateScale(40),
        },
        flatList: {
            height: deviceUI.screenSize.height * 0.28 + 8,
        },
        flatListContainer: {
            justifyContent: "center",
            alignItems: "center",
        },
        whenEmptyCard: {
            backgroundColor: theme.colorFamily.blue,
            width: deviceUI.screenSize.width * 0.9,
            height: deviceUI.screenSize.height * 0.16,
            borderRadius: deviceUI.moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
        },
        whenEmptyCardText: {
            fontSize: deviceUI.moderateScale(16),
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.white,
            marginBottom: deviceUI.moderateScale(10),
        },
    });
    return Style;
}
