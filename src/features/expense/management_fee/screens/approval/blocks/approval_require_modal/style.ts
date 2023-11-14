import { StyleSheet } from "react-native";
import { UseApprovalRequiredModalStylesType } from "./type";
import useStyler from "../../../../../../common/hooks/styler/hooks";

export default function useApprovalRequiredModalStyles() {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            //backgroundColor: "rgba(255,255,255,0.6)",
        },
        wrapper: {
            position: "absolute",
            top: 0,
            left: 0,
            height: deviceUI.getScreenSize().height,
            width: deviceUI.getScreenSize().width,
            backgroundColor: theme.color.specified.lightgrey,

            zIndex: -1,
        },
        wrapperTop: { width: deviceUI.getScreenSize().width, height: deviceUI.getScreenSize().height },
        content: {
            width: "88%",
            backgroundColor: "white",
            flex: 0,
            borderRadius: deviceUI.moderateScale(15),
            overflow: "hidden",
            elevation: 5, // Android only
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
        },
        textSection: {
            justifyContent: "center",
            alignItems: "center",
            height: deviceUI.getScreenSize().height * 0.1,
        },
        imageSection: {
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
        },
        childrenSection: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: deviceUI.moderateScale(32),
            marginTop: deviceUI.moderateScale(8),
        },
        leftButtonSection: {
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            height: deviceUI.getScreenSize().height * 0.07,
            marginBottom: deviceUI.moderateScale(20),
            marginTop: deviceUI.moderateScale(16),
        },
        title: {
            color: theme.color.specified.black,
            textAlign: "center",
            ...theme.font.researved.h3,
        },
        subtitle: {
            marginTop: deviceUI.moderateScale(5),
            color: theme.color.specified.grey,
            textAlign: "center",
            ...theme.font.researved.h5,
        },
        leftButtonText: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.specified.black,
        },
        rightButtonText: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.specified.white,
        },
        leftButton: {
            height: "80%",
            width: "40%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: deviceUI.moderateScale(8),
            marginRight: deviceUI.moderateScale(10),
            backgroundColor: theme.color.specified.lightgrey,
            opacity: 0.6,
            zIndex: -1,
        },
        rightButton: {
            height: "80%",
            width: "40%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.color.specified.blue,
            borderRadius: deviceUI.moderateScale(8),
        },
        notedTextButton: {
            marginTop: deviceUI.moderateScale(8),
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: deviceUI.moderateScale(8),
        },
        notedText: {
            color: theme.color.specified.blue,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(16),
        },
        linkIcon: {
            width: deviceUI.moderateScale(50),
            color: theme.color.specified.blue,
        },
        rightContentText: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(12),
            color: theme.color.specified.black,
        },
        leftContentText: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(14),
            color: theme.color.specified.black,
        },
    });
}
