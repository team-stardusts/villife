import { StyleSheet } from "react-native";
import useStyler from "../../../../common/hooks/styler/hooks";
import { UseExpenseApprovalOutLinedBoxListStylesType } from "./type";

export default function useExpenseApprovalOutLinedBoxListStyles(): UseExpenseApprovalOutLinedBoxListStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        contentContainer: {
            alignItems: "center",
            width: "100%",
            paddingVertical: deviceUI.moderateScale(10),
        },
    });
}
