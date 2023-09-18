import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE } from "../../../../common/constants";

export default function useBuildingSendMessageScreenStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        nav: {
            backgroundColor: theme.color.specified.white,
            color: theme.color.series.grey.level1,
        },
        container: {
            flex: 1,
            paddingTop: deviceUI.moderateScale(20),
        },
        listView: {
            height: "100%",
            paddingHorizontal: deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE),
        },
    });
}
