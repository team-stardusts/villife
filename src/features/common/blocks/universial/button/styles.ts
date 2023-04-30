import { StyleSheet } from "react-native";
import { UseUniversialButtonStylesProps, UseUniversialButtonStylesPropsReturnType } from "./types";
import useStyler from "../../../hooks/styler/hooks";

export default function useUniversialButtonStyles(
    props: UseUniversialButtonStylesProps
): UseUniversialButtonStylesPropsReturnType {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        view: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: props.borderRadius ?? deviceUI.moderateScale(8),
            flex: 1,
            width: "100%",
            borderColor: props.disabled
                ? props.disabledButtonColor ?? theme.colorFamily.lightblue
                : props.isPressing
                ? props.pressedButtonColor ?? theme.colorFamily.lightblue
                : props.buttonColor ?? theme.colorFamily.blue,
            backgroundColor: props.disabled
                ? props.disabledButtonColor ?? theme.colorFamily.lightblue
                : props.isPressing
                ? props.pressedButtonColor ?? theme.colorFamily.lightblue
                : props.buttonColor ?? theme.colorFamily.blue,
            borderWidth: props.isPressing ? deviceUI.moderateScale(16) : deviceUI.moderateScale(8),
        },
        text: {
            color: theme.colorFamily.white,
            ...theme.font.researved.h4,
            fontWeight: "bold",
        },
    });
}
