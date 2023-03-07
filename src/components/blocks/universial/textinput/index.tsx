import { useState } from "react";
import { 
    NativeSyntheticEvent, 
    TextInputChangeEventData,
    TextInputFocusEventData
} from "react-native/types"
import TextInput from "../../../atoms/textinput";
import useUniversialTextinputStyles from "./styles";
import UniversalTextInputProps from "./types";

export default function UniversalTextInput(props: UniversalTextInputProps) {
    const [isFocusing, setIsFocusing] = useState<boolean>(false);
    const { highlightColor, lowlightColor } = props;
    const Style = useUniversialTextinputStyles({isFocusing, highlightColor, lowlightColor});
    
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

    const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocusing(true);
        
        if (props.onFocus) {
            props.onFocus(e);
        }
    }

    const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocusing(false);

        if (props.onBlur) {
            props.onBlur(e);
        }
    }

    return (
        <TextInput 
            style={[
                props.style,
                Style.input
            ]}
            {...props}
            onChange={onChange}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            />
    )
}