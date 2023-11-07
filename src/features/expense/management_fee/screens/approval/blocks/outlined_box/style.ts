import { StyleSheet } from "react-native";
import useStyler from "../../../../../../common/hooks/styler/hooks";

export default function useExpenseApprovalOutlinedBoxStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            marginBottom: deviceUI.moderateScale(16),
            borderRadius: deviceUI.moderateScale(15),
            width: deviceUI.getScreenSize().width * 0.9,
            borderColor: "rgba(0, 0, 0, 0)",
        },
        innerBox: {
            alignItems: "center",
            overflow: "visible",
        },
        innerTitleSection: {
            width: "90%",
            borderColor: theme.color.specified.lightgrey,
        },
        contentBox: {
            alignItems: "center",
            flexDirection: "row",
            height: deviceUI.moderateScale(55),
        },
        titleTextBox: {
            marginLeft: "5%",
        },
        absoluteWrapper: {
            position: "absolute",
            width: "100%",
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
        },
        iconBox: { flexDirection: "row" },
        moreButton: {
            justifyContent: "center",
            marginRight: "2%",
        },
        titleText: {
            fontSize: deviceUI.moderateScale(16),
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.black,
        },
        moreIcon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.grey,
        },
    });
}
