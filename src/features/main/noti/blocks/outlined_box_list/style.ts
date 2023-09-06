import { StyleSheet } from "react-native";
import { UseNotiOutLinedBoxListStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useNotiOutLinedBoxListStyles(): UseNotiOutLinedBoxListStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        contentContainer: {
            alignItems: "center",
            width: "100%",
            paddingVertical: deviceUI.moderateScale(10),
        },
        whenEmptyCard: {
            backgroundColor: theme.color.specified.darkgrey,
            width: deviceUI.getScreenSize().width * 0.9,
            height: deviceUI.getScreenSize().height * 0.16,
            borderRadius: deviceUI.moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
            marginTop: deviceUI.moderateScale(20),
        },
        whenEmptyCardText: {
            fontSize: deviceUI.moderateScale(16),
            fontFamily: theme.font.fontFamily.pretendard.bold,
            color: theme.color.specified.white,
            marginBottom: deviceUI.moderateScale(10),
        },
    });
}
