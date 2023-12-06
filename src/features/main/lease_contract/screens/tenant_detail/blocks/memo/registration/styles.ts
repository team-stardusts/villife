import { StyleSheet } from "react-native";
import useStyler from "../../../../../../../common/hooks/styler/hooks";

export default function useMemoRegistrationBoxStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            backgroundColor: theme.color.specified.white,
        },
        wrapper: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: deviceUI.moderateScale(13),
            paddingHorizontal: deviceUI.moderateScale(15),
        },
        cursor: {
            height: "80%",
            width: deviceUI.moderateScale(1.5),
            backgroundColor: theme.color.series.grey.level4,
        },
        text: {
            fontFamily: theme.font.fontFamily.pretendard.regular,
            fontSize: deviceUI.moderateScale(15),
            color: theme.color.series.grey.level4,
            //borderBottomWidth: deviceUI.moderateScale(1),
            textDecorationStyle: "solid",
            textDecorationLine: "underline",
        },
    });
}
