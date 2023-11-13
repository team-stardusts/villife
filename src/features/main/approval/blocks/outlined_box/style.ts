import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useApprovalOutlinedBoxStyle() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        boxContainer: {
            width: deviceUI.getScreenSize().width,
            marginBottom: deviceUI.moderateScale(16),
            alignItems: "center",
        },
        boxInner: {
            justifyContent: "center",
            height: deviceUI.moderateScale(55),
            borderRadius: deviceUI.moderateScale(16),
            width: deviceUI.moderateScale(328),
        },
        contentBetween: { justifyContent: "space-between", flexDirection: "row", alignItems: "center" },
        contentContainer: {
            marginLeft: deviceUI.moderateScale(24),
        },
        contentRow: {
            flexDirection: "row",
            alignContent: "center",
            marginTop: deviceUI.moderateScale(4),
        },
        miniContentRow: {
            flexDirection: "row",
            alignItems: "center",
        },
        miniContentMargin: { marginLeft: deviceUI.moderateScale(8) },
        titleText: {
            fontSize: deviceUI.moderateScale(15),
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.black,
        },
        subText: {
            marginLeft: deviceUI.moderateScale(4),
            fontSize: deviceUI.moderateScale(10),
            fontFamily: theme.font.fontFamily.pretendard.regular,
            color: theme.color.specified.black,
        },
        moreButton: {
            marginRight: deviceUI.moderateScale(16),
        },
        buildingIcon: {
            width: deviceUI.moderateScale(18),
            color: theme.color.specified.black,
        },
        userIcon: {
            width: deviceUI.moderateScale(20),
            color: theme.color.specified.black,
        },
        moreIcon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
        },
        shadowColor: {
            color: "rgba(11, 117, 242, 0.2)",
        },
    });
}
