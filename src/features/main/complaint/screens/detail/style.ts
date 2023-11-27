import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useComplaintDetailSecreenStyle() {
    const { deviceUI, theme } = useStyler();

    const leftMargin = deviceUI.moderateScale(16);
    const styles = StyleSheet.create({
        navContainer: {
            backgroundColor: theme.color.specified.white,
        },
        topLevelBox: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: theme.color.specified.white,
        },
        registerButtonText: {
            marginLeft: "5%",
            fontSize: deviceUI.moderateScale(12),
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.white,
        },
        statusBarSection: {
            flexDirection: "row",
            width: "100%",
            marginBottom: deviceUI.moderateScale(15),
            marginLeft: leftMargin,
        },
        titleSection: {
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: deviceUI.moderateScale(14),
        },
        title: {
            fontSize: deviceUI.moderateScale(24),
            fontFamily: theme.font.fontFamily.pretendard.bold,
            marginLeft: leftMargin,
            color: theme.color.specified.black,
        },
        titleSmall: {
            fontSize: deviceUI.moderateScale(18),
            fontFamily: theme.font.fontFamily.pretendard.bold,
            marginLeft: leftMargin,
            color: theme.color.specified.black,
        },
        editButton: {
            //height: deviceUI.moderateScale(30),
            //width: deviceUI.moderateScale(80),
            paddingHorizontal: deviceUI.moderateScale(5),
            paddingVertical: deviceUI.moderateScale(5),
            backgroundColor: theme.color.specified.lightblue,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: deviceUI.moderateScale(8),
            marginRight: leftMargin,
        },
        editIcon: {
            width: deviceUI.moderateScale(35),
            color: theme.color.specified.white,
        },
        webViewContainer: {
            opacity: 0.99,
            marginLeft: leftMargin,
        },
        replyTitle: {
            alignItems: "center",
            justifyContent: "center",
            fontSize: deviceUI.moderateScale(16),
            marginLeft: leftMargin,
            fontFamily: "Pretendard-Bold",
            color: theme.color.specified.black,
        },
        horizontalLine: {
            borderBottomWidth: deviceUI.moderateScale(1),
            borderBottomColor: theme.color.specified.blue,
            marginVertical: deviceUI.moderateScale(16),
        },
        iconBuilding: {
            width: deviceUI.moderateScale(25),
            color: theme.color.specified.black,
        },
        iconPerson: {
            width: deviceUI.moderateScale(30),
            color: theme.color.specified.black,
        },
        blockWithRoomNumber: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: deviceUI.moderateScale(16),
        },
        blockWithName: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: deviceUI.moderateScale(8),
        },

        blockWithIconText: {
            fontSize: deviceUI.moderateScale(10),
            fontFamily: theme.font.fontFamily.pretendard.regular,
            color: theme.color.specified.black,
        },
        replyItem: {
            marginBottom: deviceUI.moderateScale(20),
        },
        replyTitleSection: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        absoulteWrapper: {
            position: "absolute",
            height: "100%",
        },
        iconPhone: {
            width: deviceUI.moderateScale(36),
            color: theme.color.specified.black,
        },
        callText: {
            fontSize: deviceUI.moderateScale(16),
            marginLeft: deviceUI.moderateScale(8),
            fontFamily: "Pretendard-Bold",
            color: theme.color.specified.black,
        },
        replyTitleBox: {
            marginTop: deviceUI.moderateScale(32),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: deviceUI.moderateScale(16),
        },
        webViewContainerMinHeight: {
            minHeight: deviceUI.getScreenSize().height * 0.25,
            justifyContent: "flex-end",
        },
        textRoomNumber: {
            marginLeft: deviceUI.moderateScale(4),
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(12),
            color: theme.color.specified.black,
        },
        textRenterName: {
            marginLeft: deviceUI.moderateScale(4),
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(12),
            color: theme.color.specified.black,
        },
    });
    return styles;
}
