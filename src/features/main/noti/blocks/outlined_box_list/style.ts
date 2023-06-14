import { StyleSheet } from "react-native";
import { UseNotiOutLinedBoxListStylesType } from "./type";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function useNotiOutLinedBoxListStyles(): UseNotiOutLinedBoxListStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        contentContainer: { alignItems: "center", width: "100%" },
    });
}
