import { StyleSheet } from "react-native";
import useStyler from "../../../../../../common/hooks/styler/hooks";

export default function useExpenseApprovalOutlinedBoxStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            width: deviceUI.getScreenSize().width,
            marginBottom: deviceUI.moderateScale(16),
            alignItems: "center",
        },
        innerBox: {
            justifyContent: "center",
            height: deviceUI.moderateScale(55),
            borderRadius: deviceUI.moderateScale(16),
            width: deviceUI.moderateScale(328),
        },
        contentBox: { flexDirection: "row", justifyContent: "space-between" },

        moreButton: {
            marginRight: deviceUI.moderateScale(16),
        },
        titleText: {
            marginLeft: deviceUI.moderateScale(24),
            fontSize: deviceUI.moderateScale(16),
            fontFamily: theme.font.fontFamily.pretendard.bold,
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
