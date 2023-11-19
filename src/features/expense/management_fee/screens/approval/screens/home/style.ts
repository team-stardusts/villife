import { StyleSheet } from "react-native";
import { UseExpenseApprovalScreenStylesType } from "./type";
import useStyler from "../../../../../../common/hooks/styler/hooks";

export default function useApprovalHomeScreenStyles(): UseExpenseApprovalScreenStylesType {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        nav: {
            backgroundColor: theme.color.specified.white,
            color: theme.color.series.grey.level1,
        },
    });
}
