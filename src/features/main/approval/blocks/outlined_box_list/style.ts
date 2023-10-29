import { StyleSheet } from "react-native";
import { UseApprovalOutLinedBoxListStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useApprovalOutLinedBoxListStyles(): UseApprovalOutLinedBoxListStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        contentContainer: { alignItems: "center", width: "100%" },
        whenEmptyCard: {
            backgroundColor: theme.color.series.grey.level4,
            width: deviceUI.getScreenSize().width * 0.9,
            height: deviceUI.getScreenSize().height * 0.16,
            borderRadius: deviceUI.moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
            marginTop: deviceUI.moderateScale(20),
        },

        whenEmptyCardText: {
            color: theme.color.specified.white,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(17),
            marginBottom: deviceUI.moderateScale(10),
        },
    });
}
