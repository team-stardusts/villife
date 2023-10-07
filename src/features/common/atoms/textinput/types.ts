import { TextInput } from "react-native";
import { TextInputProps as InputProps, NativeSyntheticEvent, TextInputChangeEventData } from "react-native/types";

export default interface TextInputProps extends InputProps {
    ref?: React.RefObject<TextInput>;
    name?: string;
    onChange?: ((e: NativeSyntheticEvent<TextInputChangeEventData>, name?: string) => void) | undefined;
    onChangeText?: ((text: string, name?: string) => void) | undefined;
}
