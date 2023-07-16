import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { HomeContentCardStyle } from "./type";

export default function useHomeContentCardStyle(): HomeContentCardStyle {
    const { deviceUI, theme } = useStyler();

    const Style = StyleSheet.create({
        contentContainer: {
            height: "100%",
            width: "100%",
            paddingTop: deviceUI.moderateScale(25),
        },
        itemContainer: {
            width: "100%",
            paddingHorizontal: deviceUI.moderateScale(20),
            paddingVertical: deviceUI.moderateScale(5),
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
        },
        text: {
            fontSize: deviceUI.moderateScale(16),
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.white,
            textAlign: "center",
        },
        whenEmptyContainer: {
            verticalAlign: "center",
            alignItems: "center",
        },
    });
    return Style;
}
