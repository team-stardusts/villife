import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useTentantLayoutStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            flex: 1,
        },
        selectAllBtnWrapper: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: deviceUI.moderateScale(10),
        },
        selectAllIcon: {
            width: deviceUI.moderateScale(30),
            color: theme.color.specified.lightgrey,
        },
        selectedAllText: {
            marginLeft: deviceUI.moderateScale(3),
            color: theme.color.specified.lightgrey,
            fontSize: deviceUI.moderateScale(13),
            fontFamily: theme.font.fontFamily.pretendard.regular,
        },
        selectedSelectAll: {
            color: theme.color.specified.blue,
        },
    });
}
