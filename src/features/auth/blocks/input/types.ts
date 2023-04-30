import { StyleProp, TextStyle } from "react-native/types";
import UniversalTextInputProps from "../../../common/blocks/universial/textinput/types";
import { InspectTypes } from "./validator/types";

export default interface AuthScreenCommonInputProps extends UniversalTextInputProps {
    title: string;
    titleStyle?: StyleProp<TextStyle>;
    inspect?: InspectTypes;
    onValidate?(isValid: boolean): void;
}
