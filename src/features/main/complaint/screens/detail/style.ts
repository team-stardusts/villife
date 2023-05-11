import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { ComplaintDetailScreenStylesType } from "./type";

export default function useComplaintDetailSecreenStyle(): ComplaintDetailScreenStylesType {
    const { deviceUI, theme } = useStyler();

    const Style = StyleSheet.create({
        topLevelBox: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: theme.colorFamily.white,
        },
        registerButtonText: {
            marginLeft: "5%",
            fontSize: deviceUI.moderateScale(12),
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.white,
        },
        statusBarSection: {
            flexDirection: "row",
            backgroundColor: "grey",
            width: "100%",
            minHeight: deviceUI.moderateScale(10),
        },
        title: {
            fontSize: deviceUI.moderateScale(24),
            fontFamily: "Pretendard-Bold",
        },
        webViewContainer: {
            width: deviceUI.screenSize.width * 0.8,
            opacity: 0.99,
            minHeight: 200,
        },
        replyTitle: {
            fontSize: deviceUI.moderateScale(16),
            marginLeft: "3%",
            fontFamily: "Pretendard-Bold",
            color: theme.colorFamily.black,
        },
        horizontalLine: {
            borderBottomWidth: deviceUI.moderateScale(1),
            borderBottomColor: theme.colorFamily.blue,
            marginVertical: 10,
        },
    });
    return Style;
}
