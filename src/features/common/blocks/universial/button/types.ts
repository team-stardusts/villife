import { StyleSheet } from "react-native";
import ButtonProps from "../../../atoms/button/types";

export default interface UniversalButtonProps extends ButtonProps {
    buttonColor?: string;
    pressedButtonColor?: string;
    disabledButtonColor?: string;
    borderRadius?: number;
}

export type UseUniversialButtonStylesProps = {
    isPressing: boolean;
    buttonColor?: string;
    pressedButtonColor?: string;
    disabledButtonColor?: string;
    borderRadius?: number;
    disabled?: boolean | null;
}

export type UseUniversialButtonStylesPropsReturnType = ReturnType<typeof StyleSheet.create>;