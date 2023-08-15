import { Platform, StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { ComplaintContentCardStylesType } from "./types";

export default function useComplaintContentCardStyles(): ComplaintContentCardStylesType {
    const { deviceUI, theme } = useStyler();

    const Style = StyleSheet.create({
        topLevelBox: {
            width: deviceUI.getScreenSize().width,
            paddingHorizontal: deviceUI.moderateScale(32),
            height: deviceUI.moderateScale(104),
            borderRadius: deviceUI.moderateScale(15),
            marginBottom: deviceUI.moderateScale(16),
        },
        editModeTopLevelBox: {
            width: deviceUI.getScreenSize().width * 0.8,
            height: deviceUI.getScreenSize().height * 0.16,
            borderRadius: deviceUI.moderateScale(15),
        },
        titleSection: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "blue",
            paddingLeft: deviceUI.moderateScale(24),
            paddingRight: deviceUI.moderateScale(24),
        },
        titleText: {
            fontSize: deviceUI.moderateScale(18),
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.black,
        },
        dateTimeText: {
            fontSize: deviceUI.moderateScale(12),
            fontFamily: theme.font.fontFamily.pretendard.regular,
            color: theme.color.specified.black,
        },
        statusSection: {
            width: "100%",
            paddingTop: deviceUI.moderateScale(8),
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
        },
        progressBarSection: {
            width: "90%",
            height: deviceUI.moderateScale(30),
            justifyContent: "space-between",
            flexDirection: "row",
        },
        statusTextSection: {
            width: "90%",
            justifyContent: "space-between",
            flexDirection: "row",
            top: deviceUI.moderateScale(5),
        },
        textBox: {
            width: deviceUI.moderateScale(30),
            height: deviceUI.moderateScale(30),
            justifyContent: "center",
            alignItems: "center",
        },
        statusText: {
            fontSize: deviceUI.moderateScale(12),
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.black,
        },
        outerCircle: {
            backgroundColor: theme.color.specified.white,
            width: deviceUI.moderateScale(30),
            height: deviceUI.moderateScale(30),
            borderRadius: deviceUI.moderateScale(15),
            zIndex: 10,
        },
        absoluteWrapper: {
            position: "absolute",
            justifyContent: "center",
            width: "100%",
            height: "100%",
        },
        outerCircleInnerBorder: {
            borderWidth: deviceUI.moderateScale(3),
            borderColor: "#52F21A",
            width: deviceUI.moderateScale(30),
            height: deviceUI.moderateScale(30),
            borderRadius: deviceUI.moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
        },
        innerCircle: {
            width: deviceUI.moderateScale(15),
            height: deviceUI.moderateScale(15),
            borderRadius: deviceUI.moderateScale(15),
            backgroundColor: "#52F21A",
        },
        outerCircleInnerBorderCompleted: {
            borderWidth: deviceUI.moderateScale(3),
            borderColor: theme.color.specified.darkgrey,
            width: deviceUI.moderateScale(30),
            height: deviceUI.moderateScale(30),
            borderRadius: deviceUI.moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
        },
        innerCircleCompleted: {
            width: deviceUI.moderateScale(15),
            height: deviceUI.moderateScale(15),
            borderRadius: deviceUI.moderateScale(15),
            backgroundColor: theme.color.specified.darkgrey,
        },
        middleLine: {
            height: deviceUI.moderateScale(3),
            backgroundColor: "#52F21A",
            marginLeft: deviceUI.moderateScale(15),
            borderRadius: deviceUI.moderateScale(5),
        },
        middleLineCompleted: {
            width: deviceUI.getScreenSize().width * 0.75,
            height: deviceUI.moderateScale(3),
            backgroundColor: theme.color.specified.darkgrey,
            marginLeft: deviceUI.moderateScale(15),
            borderRadius: deviceUI.moderateScale(5),
        },
        middleLineCompletedWhenEdit: {
            width: deviceUI.getScreenSize().width * 0.65,
            height: deviceUI.moderateScale(3),
            backgroundColor: theme.color.specified.darkgrey,
            marginLeft: deviceUI.moderateScale(15),
            borderRadius: deviceUI.moderateScale(5),
        },
    });
    return Style;
}
