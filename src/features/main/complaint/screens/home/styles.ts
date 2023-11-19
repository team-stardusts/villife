import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useComplaintHomeSecreenStyle() {
    const { deviceUI, theme } = useStyler();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
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
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(24),
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
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(22),
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
            height: deviceUI.getScreenSize().height * 0.07,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: deviceUI.moderateScale(16),
            marginBottom: deviceUI.moderateScale(3),
        },
        menuTitleText: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(22),
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
        whenEmpty: {
            minHeight: deviceUI.moderateScale(320),
            justifyContent: "center",
            alignItems: "center",
        },
        whenEmptyCardText: {
            fontSize: deviceUI.moderateScale(16),
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            color: theme.color.specified.black,
            marginBottom: deviceUI.moderateScale(16),
        },
    });

    return styles;
}
