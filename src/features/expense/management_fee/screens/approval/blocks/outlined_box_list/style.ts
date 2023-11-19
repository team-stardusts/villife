import { StyleSheet } from "react-native";
import useStyler from "../../../../../../common/hooks/styler/hooks";
import { UseExpenseApprovalOutLinedBoxListStylesType } from "./type";

export default function useExpenseApprovalOutLinedBoxListStyles(): UseExpenseApprovalOutLinedBoxListStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        contentContainer: {
            alignItems: "center",
            width: "100%",
            paddingVertical: deviceUI.moderateScale(10),
        },
        whenEmptyCard: {
            width: deviceUI.getScreenSize().width * 0.9,
            height: deviceUI.getScreenSize().height * 0.16,
            borderRadius: deviceUI.moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
            marginTop: deviceUI.moderateScale(20),
        },

        whenEmptyCardText: {
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.semiBold,
            fontSize: deviceUI.moderateScale(17),
            marginBottom: deviceUI.moderateScale(10),
        },
    });
}
