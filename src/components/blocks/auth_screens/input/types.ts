import { StyleProp, StyleSheet, TextStyle } from "react-native/types";
import UniversalTextInputProps from "../../universial/textinput/types";

export default interface AuthScreenCommonInputProps extends UniversalTextInputProps{
    title: string,
    titleStyle?: StyleProp<TextStyle>
}

export type UseAuthScreenCommonInputStylesReturnType = ReturnType<typeof StyleSheet.create>;