import { TextInput, View } from "react-native";
import UniversalTextInput from "../universial/textinput";
import { useEffect, useRef, useState } from "react";
import StringValidator from "../../../../libs/string_validator";
import { InputProps } from "./types";
import useInputPhoneNumberStyles from "./styles";

// phoneNumber = 010-0000-0000
export default function InputIdentityNumber(props: InputProps) {
    const styles = useInputPhoneNumberStyles();
    const validator = new Validator();
    const [identityNumber, setIdentityNumber] = useState<(string | null)[]>([null, null]);
    const refInput1 = useRef<TextInput>(null);
    const refInput2 = useRef<TextInput>(null);

    useEffect(() => {
        if (props.initialData && props.initialData.length === 2) {
            setIdentityNumber(props.initialData);
        }
    }, []);

    useEffect(() => {
        for (let i = 0; i < 2; i++) {
            const token = identityNumber[i];

            if (token === null) return;
            switch (i) {
                case 0:
                    if (token.length !== 6) {
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
            }
        }

        props.onInputValidValue(identityNumber.join("-"));
    }, [identityNumber]);

    useEffect(() => {
        if (props.focus) refInput1.current?.focus();
    }, [props.focus]);

    const validateIdentityNumber = (text: string, name: IdentityNumberPieceName): boolean => {
        let index: number = 0;
        let lengthLimit: number = 6;

        switch (name) {
            case "first":
                index = 0;
                lengthLimit = 6;
                break;
            case "second":
                index = 1;
                lengthLimit = 1;
                break;
        }

        if (validator.hasSpecialChar(text)) return false;

        const _identityNumber = identityNumber;

        if (text === "") {
            _identityNumber[index] = null;
        } else if (text.length < lengthLimit) {
            _identityNumber[index] = text;
        } else if (!validator.validatePieceOfIdentitynumber(index, text) || text.length > lengthLimit) {
            return false;
        } else {
            _identityNumber[index] = text;
        }

        setIdentityNumber([..._identityNumber]);
        return true;
    };

    return (
        <View style={styles.container}>
            <View style={[styles.inputWrapper, { width: "47%" }]}>
                <UniversalTextInput
                    ref={refInput1}
                    blurOnSubmit={false}
                    name="first"
                    placeholder="YYMMDD"
                    value={identityNumber[0] ?? ""}
                    inputMode="numeric"
                    keyboardType="numeric"
                    textAlign="center"
                    highlightColor={
                        identityNumber[0] !== null && identityNumber[0]?.length !== 6
                            ? styles.unvalidInput.color
                            : props.highlightColor
                    }
                    lowlightColor={
                        identityNumber[0] !== null && identityNumber[0]?.length !== 6
                            ? styles.unvalidInput.color
                            : props.lowlightColor
                    }
                    onChangeText={(text, name) => {
                        if (validateIdentityNumber(text, name as IdentityNumberPieceName) && text.length === 6) {
                            refInput2.current?.focus();
                        }
                    }}
                    onSubmitEditing={() => refInput2.current?.focus()}
                />
            </View>
            <View style={[styles.inputWrapper, { width: "47%" }]}>
                <UniversalTextInput
                    ref={refInput2}
                    blurOnSubmit={false}
                    name="second"
                    placeholder="첫 한자리 숫자"
                    textContentType="password"
                    value={identityNumber[1] ?? ""}
                    inputMode="numeric"
                    keyboardType="number-pad"
                    textAlign="center"
                    highlightColor={
                        identityNumber[1] !== null && identityNumber[1]?.length !== 1
                            ? styles.unvalidInput.color
                            : props.highlightColor
                    }
                    lowlightColor={
                        identityNumber[1] !== null && identityNumber[1]?.length !== 1
                            ? styles.unvalidInput.color
                            : props.lowlightColor
                    }
                    onChangeText={(text, name) => {
                        validateIdentityNumber(text, name as IdentityNumberPieceName);
                    }}
                />
            </View>
        </View>
    );
}

class Validator extends StringValidator {
    public validatePieceOfIdentitynumber(index: number, text: string): boolean {
        switch (index) {
            case 0:
                return this.isNumber(text);
            case 1:
                return this.isNumber(text);
            default:
                return false;
        }
    }
}

type IdentityNumberPieceName = "first" | "second";
