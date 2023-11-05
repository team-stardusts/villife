import { TextInput, View } from "react-native";
import UniversalTextInput from "../universial/textinput";
import { useEffect, useRef, useState } from "react";
import StringValidator from "../../../../libs/string_validator";
import { InputProps } from "./types";
import useInputPhoneNumberStyles from "./styles";

export default function Input6DigitAuthCode(props: InputProps) {
    const styles = useInputPhoneNumberStyles();
    const validator = new StringValidator();
    const [authcode, setAuthcode] = useState<(string | null)[]>([null, null, null, null, null, null]);
    const [refs, setRefs] = useState<React.RefObject<TextInput>[]>([]);
    const refInput1 = useRef<TextInput>(null);
    const refInput2 = useRef<TextInput>(null);
    const refInput3 = useRef<TextInput>(null);
    const refInput4 = useRef<TextInput>(null);
    const refInput5 = useRef<TextInput>(null);
    const refInput6 = useRef<TextInput>(null);

    useEffect(() => {
        if (props.initialData && props.initialData.length === 6) {
            setAuthcode(props.initialData);
        }
        setRefs([refInput1, refInput2, refInput3, refInput4, refInput5, refInput6]);
    }, []);

    useEffect(() => {
        for (let i = 0; i < 2; i++) {
            const token = authcode[i];

            if (token === null) return;
            switch (i) {
                case 0:
                    if (token.length !== 1) {
                        props?.onInputInvalidValue && props.onInputInvalidValue();
                        return;
                    }
                    break;
                case 1:
                    if (token.length !== 1) {
                        props?.onInputInvalidValue && props.onInputInvalidValue();
                        return;
                    }
                    break;
                case 2:
                    if (token.length !== 1) {
                        props?.onInputInvalidValue && props.onInputInvalidValue();
                        return;
                    }
                    break;
                case 3:
                    if (token.length !== 1) {
                        props?.onInputInvalidValue && props.onInputInvalidValue();
                        return;
                    }
                    break;
                case 4:
                    if (token.length !== 1) {
                        props?.onInputInvalidValue && props.onInputInvalidValue();
                        return;
                    }
                    break;
                case 5:
                    if (token.length !== 1) {
                        props?.onInputInvalidValue && props.onInputInvalidValue();
                        return;
                    }
                    break;
            }
        }

        props.onInputValidValue(authcode.join(""));
    }, [authcode]);

    useEffect(() => {
        if (props.focus) refInput1.current?.focus();
    }, [props.focus]);

    const validateAuthcode = (text: string, index: number): boolean => {
        let lengthLimit: number = 1;

        const _authcode = authcode;

        if (text === "") {
            _authcode[index] = null;
        } else if (!validator.isNumber(text)) {
            return false;
        } else if (text.length <= lengthLimit) {
            _authcode[index] = text;
        } else {
            return false;
        }

        setAuthcode([..._authcode]);
        return true;
    };

    return (
        <View style={styles.container}>
            {authcode.map((digit, index) => {
                let ref: React.RefObject<TextInput> = refs[index];
                let nextRef: React.RefObject<TextInput> | undefined = undefined;

                if (authcode.length > index + 1) {
                    nextRef = refs[index + 1];
                }

                return (
                    <View key={index} style={[styles.inputWrapper, { width: "15%" }]}>
                        <UniversalTextInput
                            ref={ref}
                            blurOnSubmit={false}
                            name={index.toString()}
                            placeholder="0"
                            value={digit ?? ""}
                            inputMode="numeric"
                            keyboardType="numeric"
                            textAlign="center"
                            highlightColor={
                                digit !== null && digit?.length !== 1 ? styles.unvalidInput.color : props.highlightColor
                            }
                            lowlightColor={
                                digit !== null && digit?.length !== 1 ? styles.unvalidInput.color : props.lowlightColor
                            }
                            onChangeText={(text) => {
                                const isCorrected = validateAuthcode(text, index) && text.length === 1;

                                if (isCorrected && nextRef !== undefined) {
                                    nextRef.current?.focus();
                                }
                            }}
                            onSubmitEditing={() => refInput2.current?.focus()}
                        />
                    </View>
                );
            })}
        </View>
    );
}
