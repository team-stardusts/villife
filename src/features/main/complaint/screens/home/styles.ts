import { StyleSheet } from "react-native";
import { ComplaintHomeScreenStylesType } from "./types";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useComplaintHomeSecreenStyle(): ComplaintHomeScreenStylesType {
    const { deviceUI, theme } = useStyler();

    const Style = StyleSheet.create({
        topLevelContainer: {
            flex: 1,
            flexDirection: "column",
            marginHorizontal: deviceUI.moderateScale(16),
        },
        FAQContainer: {
            width: "100%",
            height: deviceUI.getScreenSize().height * 0.07,
            backgroundColor: theme.color.specified.white,
            marginBottom: deviceUI.moderateScale(16),
            borderRadius: deviceUI.moderateScale(15),
        },
        arrowIcon: {
            width: deviceUI.moderateScale(45),
            backgroundColor: theme.color.specified.black,
        },
        FAQTextContainer: {
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: deviceUI.moderateScale(16),
            paddingRight: deviceUI.moderateScale(16),
        },
        FAQTitle: {
            ...theme.font.researved.h2,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.black,
        },
        registerContainer: {
            width: "100%",
            height: deviceUI.getScreenSize().height * 0.07,
            backgroundColor: theme.color.specified.white,
            marginBottom: deviceUI.moderateScale(16),
            borderRadius: deviceUI.moderateScale(15),
        },
        registerTitle: {
            ...theme.font.researved.h2,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.black,
        },
        registerTextContainer: {
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: deviceUI.moderateScale(16),
            paddingRight: deviceUI.moderateScale(16),
        },
        plusIcon: {
            width: deviceUI.moderateScale(40),
            borderColor: theme.color.specified.black,
        },
        complaintBox: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: theme.color.specified.white,
            borderRadius: deviceUI.moderateScale(15),
        },
        menuContainer: {
            width: "100%",
            paddingLeft: deviceUI.moderateScale(16),
            paddingRight: deviceUI.moderateScale(16),
            height: deviceUI.getScreenSize().height * 0.07,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        menuTitleText: {
            fontSize: deviceUI.moderateScale(24),
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.black,
        },
        filterIcon: {
            width: deviceUI.moderateScale(40),
            borderColor: theme.color.specified.black,
        },
        flatList: {
            height: deviceUI.getScreenSize().height * 0.5,
        },
        flatListContainer: {
            justifyContent: "center",
            alignItems: "center",
        },
        whenEmptyCard: {
            paddingVertical: deviceUI.moderateScale(120),
            paddingHorizontal: deviceUI.moderateScale(16),
            justifyContent: "center",
            alignItems: "center",
        },
        whenEmptyCardText: {
            fontSize: deviceUI.moderateScale(16),
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.black,
            marginBottom: deviceUI.moderateScale(24),
        },
    });

    return Style;
}
