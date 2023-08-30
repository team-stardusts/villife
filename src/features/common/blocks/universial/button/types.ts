import { ColorValue, StyleSheet } from "react-native";
import ButtonProps from "../../../atoms/button/types";

export default interface UniversalButtonProps extends ButtonProps {
    buttonColor?: ColorValue;
    pressedButtonColor?: ColorValue;
    disabledButtonColor?: ColorValue;
    borderRadius?: number;
}

export type UseUniversialButtonStylesProps = {
    isPressing: boolean;
    buttonColor?: ColorValue;
    pressedButtonColor?: ColorValue;
    disabledButtonColor?: ColorValue;
    borderRadius?: number;
    disabled?: boolean | null;
};

export type UseUniversialButtonStylesPropsReturnType = ReturnType<typeof StyleSheet.create>;
