import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { ComplaintReplyItemStylesType } from "./type";

export default function useComplaintReplyItemStyle(): ComplaintReplyItemStylesType {
    const { deviceUI, theme } = useStyler();

    const Style = StyleSheet.create({
        container: {
            width: "100%",
            flexDirection: "row",
        },
        contentText: {
            fontSize: deviceUI.moderateScale(12),
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.black,
            marginBottom: deviceUI.moderateScale(10),
        },
        profile: {
            width: deviceUI.moderateScale(30),
            height: deviceUI.moderateScale(30),
            marginRight: deviceUI.moderateScale(10),
            marginLeft: deviceUI.moderateScale(10),
        },
        contentSection: {
            width: "75%",
        },
        infoSection: {
            flexDirection: "row",
        },
        writterText: {
            fontSize: deviceUI.moderateScale(10),
            fontFamily: theme.font.fontFamilies.pretendard.regular,
            color: theme.colorFamily.black,
            marginRight: deviceUI.moderateScale(5),
            marginTop: deviceUI.moderateScale(10),
        },
        image: {
            width: deviceUI.moderateScale(50),
            height: deviceUI.moderateScale(50),
            borderRadius: deviceUI.moderateScale(8),
            marginRight: deviceUI.moderateScale(10),
        },
        moreIconSize: {
            width: deviceUI.moderateScale(24),
        },
        verticalLine: {
            borderLeftWidth: deviceUI.moderateScale(1),
            borderLeftColor: theme.colorFamily.black,
            height: deviceUI.moderateScale(10),
            marginTop: deviceUI.moderateScale(12),
            marginRight: deviceUI.moderateScale(5),
        },
     
    });
    return Style;
}
