import { StyleSheet } from "react-native";
import { UseApprovalOutLinedBoxListStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useApprovalOutLinedBoxListStyles(): UseApprovalOutLinedBoxListStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        contentContainer: { alignItems: "center", width: "100%" },
    });
}
