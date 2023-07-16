import { StyleSheet } from "react-native";
import { UseNotiOutLinedBoxListStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useNotiOutLinedBoxListStyles(): UseNotiOutLinedBoxListStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        contentContainer: { alignItems: "center", width: "100%" },
        whenEmptyCard: {
            backgroundColor: theme.colorFamily.blue,
            width: deviceUI.screenSize.width * 0.9,
            height: deviceUI.screenSize.height * 0.16,
            borderRadius: deviceUI.moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
            marginTop: deviceUI.moderateScale(20),
        },
        whenEmptyCardText: {
            fontSize: deviceUI.moderateScale(16),
            fontFamily: theme.font.fontFamilies.pretendard.bold,
            color: theme.colorFamily.white,
            marginBottom: deviceUI.moderateScale(10),
        },
    });
}
