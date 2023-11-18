import { StyleSheet } from "react-native";
import useStyler from "../../../hooks/styler/hooks";
import { UseColorLableStylesType } from "./type";

export default function useColorLableStyle(): UseColorLableStylesType {
    const { deviceUI, theme } = useStyler();
    return StyleSheet.create({
        containerRed: {
            width: deviceUI.moderateScale(45),
            height: deviceUI.moderateScale(20),
            borderRadius: deviceUI.moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.color.specified.red,
        },

        textStyle: {
            fontSize: deviceUI.moderateScale(13),
            fontFamily: theme.font.fontFamily.pretendard.medium,
            color: "white",
        },
    });
}
