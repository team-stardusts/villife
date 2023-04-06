import { Text, View } from "react-native";
import UniversalTextInput from "../../universial/textinput";
import useAuthScreenCommonInputStyles from "./styles";
import AuthScreenCommonInputProps from "./types";


export default function AuthScreenCommonInput(props: AuthScreenCommonInputProps) {
    const Styles = useAuthScreenCommonInputStyles();
    const { title, titleStyle } = props;
    const _titleStyle = titleStyle ?? Styles.inputTitle;

    return (
        <View style={Styles.inputWrapper}>
            <Text style={_titleStyle}>{title}</Text>
            <UniversalTextInput {...props}/>
        </View>
    )
}