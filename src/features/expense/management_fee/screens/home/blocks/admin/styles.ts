import { StyleSheet } from "react-native";
import useStyler from "../../../../../../common/hooks/styler/hooks";
import {
    SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE,
    SCREEN_PADDING_VERTICAL_STANDARD_VALUE,
} from "../../../../../../common/constants";

export default function useAdminMFStyles() {
    const { theme, deviceUI } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE),
        },
        siturationBox: {
            backgroundColor: theme.color.specified.white,
        },
        siturationWrapper: {
            width: "100%",
            paddingHorizontal: deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE),
            paddingVertical: deviceUI.moderateScale(SCREEN_PADDING_VERTICAL_STANDARD_VALUE),
        },
        siturationTitleBox: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: deviceUI.moderateScale(5),
            borderBottomColor: theme.color.series.grey.level1,
            paddingBottom: deviceUI.moderateScale(8),
        },
        siturationTitle: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.black,
            fontSize: deviceUI.moderateScale(24),
        },
        linkPressiable: {
            paddingVertical: deviceUI.moderateScale(10),
        },
        linkIcon: {
            width: deviceUI.moderateScale(50),
            color: theme.color.specified.black,
        },
        table: {
            marginTop: deviceUI.moderateScale(15),
        },
        row: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: deviceUI.moderateScale(15),
        },
        rowKey: {
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            color: theme.color.specified.black,
            fontSize: deviceUI.moderateScale(18),
        },
        rowValue: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            color: theme.color.specified.black,
            fontSize: deviceUI.moderateScale(16),
        },
        approvalWrapper: {
            marginBottom: deviceUI.moderateScale(15),
        },
        approvalBox: {
            backgroundColor: theme.color.specified.white,
        },
        approvalCotent: {
            width: "100%",
            paddingHorizontal: deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE),
            paddingVertical: deviceUI.moderateScale(SCREEN_PADDING_VERTICAL_STANDARD_VALUE),
        },
        approvalTitleBox: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        approvalTitle: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.black,
            fontSize: deviceUI.moderateScale(24),
        },
    });
}
