import { StyleSheet } from "react-native";
import ButtonProps from "../../../atoms/button/types";

export default interface UniversalButtonProps extends ButtonProps {
    buttonColor?: string;
    pressedButtonColor?: string;
    disabledButtonColor?: string;
}

export type UseUniversialButtonStylesProps = {
    buttonColor?: string;
    pressedButtonColor?: string;
    disabledButtonColor?: string;
    isPressing: boolean;
    disabled?: boolean | null;
}

export type UseUniversialButtonStylesPropsReturnType = ReturnType<typeof StyleSheet.create>;