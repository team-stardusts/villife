import { TextInput, View } from "react-native";
import UniversalTextInput from "../universial/textinput";
import { useEffect, useRef, useState } from "react";
import StringValidator from "../../../../libs/string_validator";
import { InputProps } from "./types";
import useInputPhoneNumberStyles from "./styles";

// phoneNumber = 010-0000-0000
export default function InputPhoneNumber(props: InputProps) {
    const styles = useInputPhoneNumberStyles();
    const validator = new Validator();
    const [phoneNumber, setPhoneNumber] = useState<(string | null)[]>([null, null, null]);
    const refInput1 = useRef<TextInput>(null);
    const refInput2 = useRef<TextInput>(null);
    const refInput3 = useRef<TextInput>(null);

    useEffect(() => {
        for (let i = 0; i < 3; i++) {
            const token = phoneNumber[i];

            if (token === null) return;
            // [010]-0000-0000
            switch (i) {
                case 0:
                    if (token.length !== 3) {
                        props?.onInputInvalidValue && props.onInputInvalidValue();
                        return;
                    }
                    break;
                case 1:
                    if (token.length !== 3 && token.length !== 4) {
                        props?.onInputInvalidValue && props.onInputInvalidValue();
                        return;
                    }
                    break;
                case 2:
                    if (token.length !== 4) {
                        props?.onInputInvalidValue && props.onInputInvalidValue();
                        return;
                    }
                    break;
            }
        }

        props.onInputValidValue(phoneNumber.join("-"));
    }, [phoneNumber]);

    useEffect(() => {
        if (props.focus) refInput1.current?.focus();
    }, [props.focus]);

    const validatePhoneNumber = (text: string, name: PhoneNumberPieceName): boolean => {
        let index: number = 0;
        let lengthLimit: number = 4;

        switch (name) {
            case "first":
                index = 0;
                lengthLimit = 3;
                break;
            case "second":
                index = 1;
                break;
            case "third":
                index = 2;
                break;
        }

        if (validator.hasSpecialChar(text)) return false;

        const _phoneNumber = phoneNumber;

        if (text === "") {
            _phoneNumber[index] = null;
        } else if (text.length < lengthLimit) {
            _phoneNumber[index] = text;
        } else if (!validator.validatePieceOfPhoneNumber(index, text) || text.length > lengthLimit) {
            return false;
        } else {
            _phoneNumber[index] = text;
        }

        setPhoneNumber([..._phoneNumber]);
        return true;
    };

    return (
        <View style={styles.container}>
            <View style={[styles.inputWrapper, { width: "25%" }]}>
                <UniversalTextInput
                    ref={refInput1}
                    blurOnSubmit={false}
                    name="first"
                    placeholder="010"
                    value={phoneNumber[0] ?? ""}
                    inputMode="numeric"
                    keyboardType="numeric"
                    textAlign="center"
                    highlightColor={
                        phoneNumber[0] !== null && phoneNumber[0]?.length !== 3 ? styles.unvalidInput.color : undefined
                    }
                    lowlightColor={
                        phoneNumber[0] !== null && phoneNumber[0]?.length !== 3 ? styles.unvalidInput.color : undefined
                    }
                    onChangeText={(text, name) => {
                        if (validatePhoneNumber(text, name as PhoneNumberPieceName) && text.length === 3) {
                            refInput2.current?.focus();
                        }
                    }}
                    onSubmitEditing={() => refInput2.current?.focus()}
                />
            </View>
            <View style={[styles.inputWrapper, { width: "35%" }]}>
                <UniversalTextInput
                    ref={refInput2}
                    blurOnSubmit={false}
                    name="second"
                    placeholder="0000"
                    value={phoneNumber[1] ?? ""}
                    inputMode="numeric"
                    keyboardType="number-pad"
                    textAlign="center"
                    highlightColor={
                        phoneNumber[1] !== null && phoneNumber[1]?.length !== 3 && phoneNumber[1]?.length !== 4
                            ? styles.unvalidInput.color
                            : undefined
                    }
                    lowlightColor={
                        phoneNumber[1] !== null && phoneNumber[1]?.length !== 3 && phoneNumber[1]?.length !== 4
                            ? styles.unvalidInput.color
                            : undefined
                    }
                    onChangeText={(text, name) => {
                        if (validatePhoneNumber(text, name as PhoneNumberPieceName) && text.length === 4) {
                            refInput3.current?.focus();
                        }
                    }}
                />
            </View>
            <View style={[styles.inputWrapper, { width: "35%" }]}>
                <UniversalTextInput
                    ref={refInput3}
                    blurOnSubmit={false}
                    name="third"
                    placeholder="0000"
                    value={phoneNumber[2] ?? ""}
                    inputMode="numeric"
                    keyboardType="number-pad"
                    textAlign="center"
                    highlightColor={
                        phoneNumber[2] !== null && phoneNumber[2]?.length !== 4 ? styles.unvalidInput.color : undefined
                    }
                    lowlightColor={
                        phoneNumber[2] !== null && phoneNumber[2]?.length !== 4 ? styles.unvalidInput.color : undefined
                    }
                    onChangeText={(text, name) => validatePhoneNumber(text, name as PhoneNumberPieceName)}
                />
            </View>
        </View>
    );
}

class Validator extends StringValidator {
    public validatePieceOfPhoneNumber(index: number, text: string): boolean {
        switch (index) {
            case 0:
                return /^01(?:0|1|[6-9])$/.test(text);
            case 1:
                return /^(\d{3}|\d{4})$/.test(text);
            case 2:
                return /\d{4}$/.test(text);
            default:
                return false;
        }
    }
}

type PhoneNumberPieceName = "first" | "second" | "third";
