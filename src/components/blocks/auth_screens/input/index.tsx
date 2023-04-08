import { useState } from "react";
import { Text, View } from "react-native";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import UniversalTextInput from "../../universial/textinput";
import useAuthScreenCommonInputStyles from "./styles";
import AuthScreenCommonInputProps from "./types";
import TextInputValidators from "./validator";

export default function AuthScreenCommonInput(props: AuthScreenCommonInputProps) {
    const { title, titleStyle, inspect } = props;
    const styles = useAuthScreenCommonInputStyles();
    const message = useScreenMessage();
    const [text, setText] = useState<string>("");

    const _titleStyle = titleStyle ?? styles.inputTitle;

    const onChangeText = (text: string) => {
        if (props.onChangeText) {
            setText(text);
            props.onChangeText(text, props.name);
        }
    };

    return (
        <View style={styles.inputWrapper}>
            <Text style={_titleStyle}>{title}</Text>
            <UniversalTextInput {...props} onChangeText={onChangeText} />
            {inspect && (
                <View style={styles.validatorWrapper}>
                    {inspect?.hasEnglish && (
                        <TextInputValidators
                            title={message.messages.words.use_english}
                            text={text}
                            examine={"hasEnglish"}
                        />
                    )}
                    {inspect?.hasEnglishOnlySmallCase && (
                        <TextInputValidators
                            title={message.messages.words.use_english_only_smallcase}
                            text={text}
                            examine={"hasEnglishOnlySmallCase"}
                        />
                    )}
                    {inspect?.hasNumber && (
                        <TextInputValidators
                            title={message.messages.words.use_number}
                            text={text}
                            examine={"hasNumber"}
                        />
                    )}
                    {inspect?.hasSpecialChar && (
                        <TextInputValidators
                            title={message.messages.words.use_special_char}
                            text={text}
                            examine={"hasSpecialChar"}
                        />
                    )}
                    {inspect?.tokens4to10 && (
                        <TextInputValidators
                            title={message.messages.words.tokens_for_4to10}
                            text={text}
                            examine={"tokens4to10"}
                        />
                    )}
                    {inspect?.tokens8to20 && (
                        <TextInputValidators
                            title={message.messages.words.tokens_for_8to20}
                            text={text}
                            examine={"tokens8to20"}
                        />
                    )}
                    {typeof inspect?.matching === "string" || inspect?.matching === null ? (
                        <TextInputValidators
                            title={message.messages.words.matching_password}
                            text={text}
                            examine={"matching"}
                            matchingText={inspect?.matching}
                        />
                    ) : (
                        <></>
                    )}
                </View>
            )}
        </View>
    );
}
