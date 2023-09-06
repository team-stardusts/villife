import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { HomeContentCardStyle } from "./type";

export default function useHomeContentCardStyle(): HomeContentCardStyle {
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
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.black,
        },
    });
    return Style;
}
