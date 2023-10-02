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
        },
        receivedLabel: {
            color: theme.color.specified.black,
            backgroundColor: theme.color.specified.green,
        },
        progressLabel: {
            color: theme.color.specified.black,
            backgroundColor: theme.color.specified.green,
        },
        completedLabel: {
            color: theme.color.specified.black,
            backgroundColor: theme.color.specified.grey,
        },
    });
    return Style;
}
