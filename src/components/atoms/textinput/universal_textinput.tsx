import { NativeSyntheticEvent, TextInput, TextInputChangeEventData } from "react-native";
import { UniversalTextInputProps } from "./types";


export default function UniversalTextInput(props: UniversalTextInputProps) {
    
    const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {        
        if (props.onChange) {
            props.onChange(props.name, e);
        }
    }

    const onChangeText = (text: string) => {        
        if (props.onChangeText) {
            props.onChangeText(props.name, text);
        }
    }

    return (
        <TextInput 
            {...props} 
            onChange={onChange}
            onChangeText={onChangeText}
            />
    )
}