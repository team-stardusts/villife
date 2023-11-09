import { TextInput as OriginTextInput, TextStyle } from "react-native";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native/types";
import TextInputProps from "./types";
import { ForwardedRef, forwardRef } from "react";

const TextInput = forwardRef((props: TextInputProps, ref: ForwardedRef<OriginTextInput>) => {
    const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        if (props.onChange) {
            props.onChange(e, props.name);
        }
    };

    const onChangeText = (text: string) => {
        if (props.onChangeText) {
            props.onChangeText(text, props.name);
        }
    };

    return <OriginTextInput {...props} ref={ref} onChange={onChange} onChangeText={onChangeText} />;
});

export default TextInput;
