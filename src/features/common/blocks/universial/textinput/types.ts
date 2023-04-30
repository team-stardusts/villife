import { StyleSheet } from "react-native";
import TextInputProps from "../../../atoms/textinput/types";

export default interface UniversalTextInputProps extends TextInputProps {
    highlightColor?: string;
    lowlightColor?: string;
}

export type UseUniversialTextinputStylesProps = {
    highlightColor?: string;
    lowlightColor?: string;
    isFocusing: boolean;
}

export type UseUniversialTextinputStylesPropsReturnType = ReturnType<typeof StyleSheet.create>;