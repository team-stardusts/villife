import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useComplaintDetailSecreenStyle() {
    const { deviceUI, theme } = useStyler();

    const leftMargin = deviceUI.moderateScale(15);
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
        },
        title: {
            fontSize: deviceUI.moderateScale(24),
            fontFamily: theme.font.fontFamily.pretendard.bold,
            marginLeft: leftMargin,
            color: theme.color.specified.black,
            marginTop: deviceUI.moderateScale(15),
            marginBottom: deviceUI.moderateScale(10),
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
            minHeight: 200,
            marginLeft: leftMargin,
        },
        replyTitle: {
            marginTop: deviceUI.moderateScale(30),
            fontSize: deviceUI.moderateScale(16),
            marginLeft: leftMargin,
            fontFamily: "Pretendard-Bold",
            color: theme.color.specified.black,
        },
        horizontalLine: {
            borderBottomWidth: deviceUI.moderateScale(1),
            borderBottomColor: theme.color.specified.blue,
            marginVertical: 10,
        },
        iconBuilding: {
            width: deviceUI.moderateScale(25),
            color: theme.color.specified.black,
        },
        iconPerson: {
            width: deviceUI.moderateScale(30),
            color: theme.color.specified.black,
        },
        blockWithIcon: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: deviceUI.moderateScale(20),
            marginLeft: deviceUI.moderateScale(15),
        },
        blockWithIconText: {
            fontSize: deviceUI.moderateScale(10),
            fontFamily: theme.font.fontFamily.pretendard.regular,
            color: theme.color.specified.black,
        },
        replyItem: {
            marginBottom: deviceUI.moderateScale(20),
        },
        absoulteWrapper: {
            position: "absolute",
            height: "100%",
        },
    });
    return styles;
}
