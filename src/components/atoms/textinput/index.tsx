import { TextInput as OriginTextInput } from "react-native";
import { 
    NativeSyntheticEvent, 
    TextInputChangeEventData, 
} from "react-native/types"
import TextInputProps from "./types";


export default function TextInput(props: TextInputProps) {
    const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {        
        if (props.onChange) {
            props.onChange(e, props.name);
        }
    }

    const onChangeText = (text: string) => {        
        if (props.onChangeText) {
            props.onChangeText(text, props.name);
        }
    }

    return (
        <OriginTextInput 
            {...props} 
            onChange={onChange}
            onChangeText={onChangeText}
            />
    )
}