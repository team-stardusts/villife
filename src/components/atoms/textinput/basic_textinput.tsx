import { NativeSyntheticEvent, TextInput, TextInputChangeEventData } from "react-native";
import { BasicTextInputProps } from "./types";


export default function BasicTextInput(props: BasicTextInputProps) {
    
    const handleOnChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {        
        if (props.onChange) {
            props.onChange(props.name, e);
        }
    }

    const handleOnChangeText = (text: string) => {        
        if (props.onChangeText) {
            props.onChangeText(props.name, text);
        }
    }

    return (
        <TextInput 
            {...props} 
            onChange={handleOnChange}
            onChangeText={handleOnChangeText}
            />
    )
}