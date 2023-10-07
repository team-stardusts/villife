import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import UniversalTextInput from "../../../common/blocks/universial/textinput";
import useAuthScreenCommonInputStyles from "./styles";
import AuthScreenCommonInputProps from "./types";
import TextInputValidator from "./validator";
import ValidatorProps from "./validator/types";

type ValidateResults = {
    examine: ValidatorProps["examine"];
    isValid: boolean;
};

export default function AuthScreenCommonInput(props: AuthScreenCommonInputProps) {
    // [TO-DO] Validator가 검사 후 true를 반환하도록 변경
    const styles = useAuthScreenCommonInputStyles();
    const message = useScreenMessage();
    const [text, setText] = useState<string>("");
    const [validateResults, setValidateResults] = useState<ValidateResults[]>([]);
    const [isValid, setIsValid] = useState<boolean>(false);

    const _titleStyle = props.titleStyle ?? styles.title;

    const validate = (examine: ValidatorProps["examine"], isValid: boolean) => {
        if (validateResults.length === 0) {
            return;
        }

        let validateResultIndex: number | null = null;
        const result = validateResults.find((value, index) => {
            if (value.examine === examine) {
                validateResultIndex = index;
                return value;
            }
        });

        if (result === undefined) {
            return;
        } else {
            const _validateResults = validateResults;

            if (validateResultIndex != null) {
                _validateResults[validateResultIndex] = { examine, isValid };
            }
            setValidateResults([..._validateResults]);
        }
    };

    useEffect(() => {
        props.onInputText && props.onInputText(text, isValid);
    }, [text, isValid]);

    useEffect(() => {
        let valid = true;

        validateResults.forEach((value) => {
            !value.isValid && (valid = false);
        });

        setIsValid(valid);
    }, [validateResults]);

    useEffect(() => {
        if (props.inspect !== undefined) {
            let _valudateResult: ValidateResults[] = [];

            for (const key in props.inspect) {
                _valudateResult.push({
                    examine: key as ValidateResults["examine"],
                    isValid: false,
                });
            }
            setValidateResults([..._valudateResult]);
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={_titleStyle}>{props.title}</Text>
            </View>
            <View style={styles.inputBox}>
                <UniversalTextInput {...props} onChangeText={(text) => setText(text)} />
            </View>
            {props.inspect && (
                <View style={styles.validatorBox}>
                    {props.inspect?.isNumber && (
                        <TextInputValidator
                            title={message.messages.words.use_english}
                            text={text}
                            examine={"isNumber"}
                            onValidate={validate}
                        />
                    )}
                    {props.inspect?.hasEnglish && (
                        <TextInputValidator
                            title={message.messages.words.use_english}
                            text={text}
                            examine={"hasEnglish"}
                            onValidate={validate}
                        />
                    )}
                    {props.inspect?.hasEnglishOnlySmallCase && (
                        <TextInputValidator
                            title={message.messages.words.use_english_only_smallcase}
                            text={text}
                            examine={"hasEnglishOnlySmallCase"}
                            onValidate={validate}
                        />
                    )}
                    {props.inspect?.hasNumber && (
                        <TextInputValidator
                            title={message.messages.words.use_number}
                            text={text}
                            examine={"hasNumber"}
                            onValidate={validate}
                        />
                    )}
                    {props.inspect?.hasSpecialChar && (
                        <TextInputValidator
                            title={message.messages.words.use_special_char}
                            text={text}
                            examine={"hasSpecialChar"}
                            onValidate={validate}
                        />
                    )}
                    {props.inspect?.tokens4to10 && (
                        <TextInputValidator
                            title={message.messages.words.tokens_for_4to10}
                            text={text}
                            examine={"tokens4to10"}
                            onValidate={validate}
                        />
                    )}
                    {props.inspect?.tokens8to20 && (
                        <TextInputValidator
                            title={message.messages.words.tokens_for_8to20}
                            text={text}
                            examine={"tokens8to20"}
                            onValidate={validate}
                        />
                    )}
                    {typeof props.inspect?.matching === "string" || props.inspect?.matching === null ? (
                        <TextInputValidator
                            title={message.messages.words.matching_password}
                            text={text}
                            examine={"matching"}
                            matchingText={props.inspect?.matching}
                            onValidate={validate}
                        />
                    ) : (
                        <></>
                    )}
                </View>
            )}
        </View>
    );
}
