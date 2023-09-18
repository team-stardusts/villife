import { StyleSheet } from "react-native";
import useStyler from "../../../../../../common/hooks/styler/hooks";

export default function useBuildingTentantMessageStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
        },
        button: {
            width: "70%",
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "center",
            marginRight: deviceUI.moderateScale(20),
        },
        text: {
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.specified.blue,
        },
    });
}
