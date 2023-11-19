import { StyleSheet } from "react-native";
import { UseApprovalOutLinedBoxListStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useApprovalOutLinedBoxListStyles(): UseApprovalOutLinedBoxListStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        contentContainer: {
            alignItems: "center",
            width: "100%",
            paddingVertical: deviceUI.moderateScale(10),
        },

        whenEmptyCard: {
            minHeight: deviceUI.moderateScale(400),
            justifyContent: "center",
            alignContent: "center",
        },

        whenEmptyCardText: {
            alignItems: "center",
            justifyContent: "center",
            color: theme.color.specified.black,
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(17),
            marginBottom: deviceUI.moderateScale(10),
        },
    });
}
