import { TextInputProps, NativeSyntheticEvent, TextInputChangeEventData } from "react-native/types";

export declare interface BasicTextInputProps extends TextInputProps{
    name?: string;
    onChange?: 
        | ((name?: string, e: NativeSyntheticEvent<TextInputChangeEventData>) => void)
        | undefined;
    onChangeText?: ((name?: string, text: string) => void) | undefined;
}