import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useHomeContentCardStyle() {
    const { deviceUI, theme } = useStyler();

    const Style = StyleSheet.create({
        contentContainer: {
            height: "100%",
            width: "100%",
        },
        itemContainer: {
            width: "100%",
            //paddingHorizontal: deviceUI.moderateScale(20),
            paddingVertical: deviceUI.moderateScale(8),
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
        },
        text: {
            fontSize: deviceUI.moderateScale(16),
            fontFamily: theme.font.fontFamily.pretendard.medium,
            color: theme.color.specified.black,
            textAlign: "center",
        },
        whenEmptyContainer: {
            verticalAlign: "center",
            alignItems: "center",
        },
        requireReadingLabel: {
            color: theme.color.specified.white,
            backgroundColor: theme.color.specified.lightblue,
        },
        generalLabel: {
            color: theme.color.specified.white,
            backgroundColor: theme.color.specified.grey,
        },
    });
    return Style;
}
