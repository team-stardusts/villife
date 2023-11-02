import { Platform, StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE } from "../../../../common/constants";
import useNavigationViewSpace from "../../../../common/blocks/navigation/service";

export default function useMFDepositCheckScreenStyles() {
    const { deviceUI, theme, safetyEdgeSize } = useStyler();
    const window = useNavigationViewSpace({
        applyDefaultHorizontalPadding: false,
        applyDefaultVerticalPadding: false,
        isBottomNavShown: false,
        isHeaderShown: true,
    });

    return StyleSheet.create({
        nav: {},
        container: {
            flex: 1,
        },
        confirmModalContainer: {
            width: "100%",
            alignItems: "center",
            marginBottom: deviceUI.moderateScale(15),
        },
        confirmModalRow: {
            width: "85%",
            flexDirection: "row",
            justifyContent: "flex-start",
            marginVertical: deviceUI.moderateScale(3),
        },
        confirmModalTxt: {
            width: "20%",
            textAlign: "center",
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(20),
            color: theme.color.specified.black,
        },
        selectAllWrapper: {
            height: window.height * 0.05,
            alignItems: "flex-end",
            paddingHorizontal: deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE),
        },
        selectAllBtn: {
            flexDirection: "row",
            alignItems: "center",
            padding: deviceUI.moderateScale(3),
        },
        selectAllIcon: {
            width: deviceUI.moderateScale(25),
            color: theme.color.series.grey.level3,
        },
        selectAllText: {
            fontFamily: theme.font.fontFamily.pretendard.medium,
            fontSize: deviceUI.moderateScale(13),
            color: theme.color.series.grey.level3,
            marginLeft: deviceUI.moderateScale(8),
        },
        selectAll: {
            color: theme.color.specified.lightblue,
        },
        scrollView: {
            height: window.height * 0.88,
            width: "100%",
            paddingHorizontal: deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE),
            paddingBottom: deviceUI.moderateScale(10),
        },
        bottomBtnWrapper: {
            height: window.height * 0.07,
        },
        bottomBtn: {
            position: "absolute",
            bottom: -safetyEdgeSize.bottom,
            height: window.height * 0.08 + safetyEdgeSize.bottom,
            width: deviceUI.getScreenSize().width,
            backgroundColor: theme.color.specified.blue,
            justifyContent: deviceUI.select({
                ios: "flex-start",
                android: "center",
            }),
            alignItems: "center",
            paddingTop: deviceUI.select({
                ios: deviceUI.moderateScale(20),
                android: deviceUI.moderateScale(0),
            }),
        },
        bottomBtnDisabled: {
            color: theme.color.series.grey.level5,
            backgroundColor: theme.color.specified.lightgrey,
        },
        bottomBtnTxt: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.white,
        },
    });
}
