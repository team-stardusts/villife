import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { ComplaintContentCardStylesType } from "./types";

export default function useComplaintContentCardStyles(): ComplaintContentCardStylesType {
    const { deviceUI, theme } = useStyler();

    const Style = StyleSheet.create({
        topLevelBox: {
            //backgroundColor: theme.colorFamily.blue,
            width: deviceUI.screenSize.width * 0.9,
            height: deviceUI.screenSize.height * 0.16,
            borderRadius: deviceUI.moderateScale(15),
        },
        editModeTopLevelBox: {
            width: deviceUI.screenSize.width * 0.8,
            height: deviceUI.screenSize.height * 0.16,
            borderRadius: deviceUI.moderateScale(15),
        },
        contentBoxCompleted: {
            backgroundColor: theme.colorFamily.lightgrey,
        },
        contentBoxInProgress: {
            backgroundColor: theme.colorFamily.blue,
        },
        titleSection: {
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: "5%",
        },
        titleText: {
            fontSize: deviceUI.moderateScale(14),
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.white,
        },
        dateTimeText: {
            fontSize: deviceUI.moderateScale(12),
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.white,
        },
        statusSection: {
            width: "100%",
            height: "50%",
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
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.white,
        },
        outerCircle: {
            backgroundColor: theme.colorFamily.white,
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
            borderColor: theme.colorFamily.darkgrey,
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
            backgroundColor: theme.colorFamily.darkgrey,
        },
        middleLine: {
            height: deviceUI.moderateScale(3),
            backgroundColor: "#52F21A",
            marginLeft: deviceUI.moderateScale(15),
            borderRadius: deviceUI.moderateScale(5),
        },
        middleLineCompleted: {
            width: deviceUI.screenSize.width * 0.75,
            height: deviceUI.moderateScale(3),
            backgroundColor: theme.colorFamily.darkgrey,
            marginLeft: deviceUI.moderateScale(15),
            borderRadius: deviceUI.moderateScale(5),
        },
        middleLineCompletedWhenEdit: {
            width: deviceUI.screenSize.width * 0.65,
            height: deviceUI.moderateScale(3),
            backgroundColor: theme.colorFamily.darkgrey,
            marginLeft: deviceUI.moderateScale(15),
            borderRadius: deviceUI.moderateScale(5),
        },
    });
    return Style;
}
