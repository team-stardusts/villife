import { StyleSheet } from "react-native";
import { UseApprovalHomeScreenStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useApprovalHomeScreenStyles(): UseApprovalHomeScreenStylesType {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        nav: {
            backgroundColor: theme.color.specified.white,
            color: theme.color.series.grey.level1,
        },
    });
}
