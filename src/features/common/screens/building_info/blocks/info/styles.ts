import { StyleSheet } from "react-native";
import useStyler from "../../../../hooks/styler/hooks";

export default function useBuildingInfoViewStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        contentBox: {
            backgroundColor: theme.color.specified.white,
        },
        container: {},
        editBtn: {
            justifyContent: "center",
            alignItems: "center",
            borderRadius: deviceUI.moderateScale(10),
            paddingVertical: deviceUI.moderateScale(5),
            paddingHorizontal: deviceUI.moderateScale(10),
            backgroundColor: theme.color.series.grey.level1,
        },
        editBtnTitle: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(14),
            color: theme.color.specified.black,
        },
        section: {
            marginBottom: deviceUI.moderateScale(10),
            paddingVertical: deviceUI.moderateScale(8),
            borderBottomWidth: deviceUI.moderateScale(2),
            borderBottomColor: theme.color.series.grey.level1,
        },
        sectionTitleBox: {
            paddingLeft: deviceUI.moderateScale(5),
            marginBottom: deviceUI.moderateScale(5),
        },
        sectionTitle: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(20),
            color: theme.color.specified.black,
        },
        sectionRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: deviceUI.moderateScale(5),
        },
        sectionRowKey: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(18),
            color: theme.color.specified.black,
        },
        sectionRowValue: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(16),
            color: theme.color.specified.black,
        },
    });
}
