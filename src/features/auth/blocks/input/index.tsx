import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import useScreenMessage from "../../../common/hooks/multilingual/hooks";
import UniversalTextInput from "../../../common/blocks/universial/textinput";
import useAuthScreenCommonInputStyles from "./styles";
import AuthScreenCommonInputProps from "./types";
import TextInputValidators from "./validator";
import ValidatorProps, { InspectTypes } from "./validator/types";

type ValidateResults = {
    examine: ValidatorProps["examine"];
    isValid: boolean;
};

export default function AuthScreenCommonInput(props: AuthScreenCommonInputProps) {
    // [TO-DO] Validator가 검사 후 true를 반환하도록 변경
    const { title, titleStyle, inspect, onValidate } = props;
    const styles = useAuthScreenCommonInputStyles();
    const message = useScreenMessage();
    const [text, setText] = useState<string>("");
    const [validateResults, setValidateResults] = useState<ValidateResults[]>([]);
    const [isValid, setIsValid] = useState<boolean>(false);

    const _titleStyle = titleStyle ?? styles.inputTitle;

    const onChangeText = (text: string) => {
        if (props.onChangeText) {
            setText(text);
            props.onChangeText(text, props.name);
        }
    };

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
        onValidate && onValidate(isValid);
    }, [isValid]);

    useEffect(() => {
        let valid = true;

        validateResults.forEach((value) => {
            !value.isValid && (valid = false);
        });

        setIsValid(valid);
    }, [validateResults]);

    useEffect(() => {
        if (inspect !== undefined) {
            let _valudateResult: ValidateResults[] = [];

            for (const key in inspect) {
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
            <Text style={_titleStyle}>{title}</Text>
            <UniversalTextInput style={[props.style, { height: "100%" }]} {...props} onChangeText={onChangeText} />
            {inspect && (
                <View style={styles.validatorWrapper}>
                    {inspect?.isNumber && (
                        <TextInputValidators
                            title={message.messages.words.use_english}
                            text={text}
                            examine={"isNumber"}
                            onValidate={validate}
                        />
                    )}
                    {inspect?.hasEnglish && (
                        <TextInputValidators
                            title={message.messages.words.use_english}
                            text={text}
                            examine={"hasEnglish"}
                            onValidate={validate}
                        />
                    )}
                    {inspect?.hasEnglishOnlySmallCase && (
                        <TextInputValidators
                            title={message.messages.words.use_english_only_smallcase}
                            text={text}
                            examine={"hasEnglishOnlySmallCase"}
                            onValidate={validate}
                        />
                    )}
                    {inspect?.hasNumber && (
                        <TextInputValidators
                            title={message.messages.words.use_number}
                            text={text}
                            examine={"hasNumber"}
                            onValidate={validate}
                        />
                    )}
                    {inspect?.hasSpecialChar && (
                        <TextInputValidators
                            title={message.messages.words.use_special_char}
                            text={text}
                            examine={"hasSpecialChar"}
                            onValidate={validate}
                        />
                    )}
                    {inspect?.tokens4to10 && (
                        <TextInputValidators
                            title={message.messages.words.tokens_for_4to10}
                            text={text}
                            examine={"tokens4to10"}
                            onValidate={validate}
                        />
                    )}
                    {inspect?.tokens8to20 && (
                        <TextInputValidators
                            title={message.messages.words.tokens_for_8to20}
                            text={text}
                            examine={"tokens8to20"}
                            onValidate={validate}
                        />
                    )}
                    {typeof inspect?.matching === "string" || inspect?.matching === null ? (
                        <TextInputValidators
                            title={message.messages.words.matching_password}
                            text={text}
                            examine={"matching"}
                            matchingText={inspect?.matching}
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
