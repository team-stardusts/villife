import { StyleProp, StyleSheet, TextStyle } from "react-native/types";
import UniversalTextInputProps from "../../universial/textinput/types";
import { ExamineType, InspectTypes } from "./validator/types";

export default interface AuthScreenCommonInputProps extends UniversalTextInputProps {
    title: string;
    titleStyle?: StyleProp<TextStyle>;
    inspect?: InspectTypes;
}
