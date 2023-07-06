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
            backgroundColor: theme.colorFamily.red,
        },

        textStyle: {
            ...theme.font.researved.h5,
            color: "white",
        },
    });
}
