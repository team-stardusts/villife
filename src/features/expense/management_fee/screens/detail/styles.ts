import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useManagementFeeDetailScreenStyles() {
    const { deviceUI, theme } = useStyler();

    const main = StyleSheet.create({
        navContainer: {
            color: theme.color.specified.white,
        },
        container: {
            flex: 1,
        },
        totalMFBox: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginVertical: deviceUI.moderateScale(30),
        },
        totalMF: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(26),
            color: theme.color.specified.black,
            marginLeft: deviceUI.moderateScale(5),
        },
        selector: {
            position: "absolute",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: deviceUI.moderateScale(30),
            top: -deviceUI.moderateScale(33),
            right: 0,
        },
        selectorText: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
            marginRight: deviceUI.moderateScale(5),
        },
        selectorIcon: {
            width: deviceUI.moderateScale(40),
            color: theme.color.specified.black,
        },
        billBox: {
            borderTopWidth: deviceUI.moderateScale(4),
            borderBottomWidth: deviceUI.moderateScale(4),
            borderColor: theme.color.series.grey.level1,
            paddingVertical: deviceUI.moderateScale(20),
        },
        billBoxTitleBox: {
            marginBottom: deviceUI.moderateScale(10),
        },
        billBoxTitle: {
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(16),
            color: theme.color.specified.black,
        },
        billBoxRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: deviceUI.moderateScale(10),
            marginVertical: deviceUI.moderateScale(10),
        },
        billBoxRowMajorKey: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(16),
            color: theme.color.specified.black,
        },
        billBoxRowMajorValue: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.black,
        },
        billBoxRowMinorKey: {
            marginLeft: deviceUI.moderateScale(8),
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.series.grey.level4,
        },
        billBoxRowMinorValue: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(12),
            color: theme.color.series.grey.level4,
        },
    });

    return {
        main,
    };
}
