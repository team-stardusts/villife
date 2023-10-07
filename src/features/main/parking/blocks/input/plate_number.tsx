import { TextInput, View } from "react-native";
import UniversalTextInput from "../../../../common/blocks/universial/textinput";
import { useEffect, useRef, useState } from "react";
import StringValidator from "../../../../../libs/string_validator";
import { InputProps } from "./types";
import useInputPhoneNumberStyles from "./styles";

// phoneNumber = 010-0000-0000
export default function InputPlateNumber(props: InputProps) {
    const styles = useInputPhoneNumberStyles();
    const validator = new Validator();
    const [plateNumber, setPlateNumber] = useState<(string | null)[]>([null, null, null]);
    const refInput2 = useRef<TextInput>(null);
    const refInput3 = useRef<TextInput>(null);

    useEffect(() => {
        for (let i = 0; i < 3; i++) {
            const token = plateNumber[i];

            if (token === null) return;

            switch (i) {
                case 0:
                    if (token.length !== 2 && token.length !== 3) return;
                    break;
                case 1:
                    if (token.length !== 1) return;
                    if (validator.isKoreanConsonant(token)) return;
                    break;
                case 2:
                    if (token.length !== 4) return;
                    break;
            }
        }

        const _platenumber = `${plateNumber[0]}${plateNumber[1]} ${plateNumber[2]}`;

        props.onInputValidValue(_platenumber);
    }, [plateNumber]);

    const validatePlateNumber = (text: string, name: PlateNumberPieceName): boolean => {
        let index: number = 0;
        let lengthLimit: number = 3;

        switch (name) {
            case "first":
                index = 0;
                break;
            case "second":
                index = 1;
                lengthLimit = 1;
                break;
            case "third":
                index = 2;
                lengthLimit = 4;
                break;
        }

        if (validator.hasSpecialChar(text) || validator.hasAlpha(text) || validator.hasAlphaLargeCase(text))
            return false;

        const _phoneNumber = plateNumber;

        if (text === "") {
            _phoneNumber[index] = null;
        } else if (index === 1 && validator.isKoreanConsonant(text)) {
            _phoneNumber[index] = text;
        } else if (text.length < lengthLimit) {
            _phoneNumber[index] = text;
        } else if (!validator.validatePieceOfPlateNumber(index, text) || text.length > lengthLimit) {
            return false;
        } else {
            _phoneNumber[index] = text;
        }

        setPlateNumber([..._phoneNumber]);
        return true;
    };

    return (
        <View style={styles.container}>
            <View style={[styles.inputWrapper, { width: "30%" }]}>
                <UniversalTextInput
                    name="first"
                    placeholder="100"
                    value={plateNumber[0] ?? ""}
                    inputMode="numeric"
                    keyboardType="number-pad"
                    textAlign="center"
                    highlightColor={
                        plateNumber[0] !== null && plateNumber[0]?.length !== 2 && plateNumber[0]?.length !== 3
                            ? styles.unvalidInput.color
                            : undefined
                    }
                    lowlightColor={
                        plateNumber[0] !== null && plateNumber[0]?.length !== 2 && plateNumber[0]?.length !== 3
                            ? styles.unvalidInput.color
                            : undefined
                    }
                    onChangeText={(text, name) => {
                        if (validatePlateNumber(text, name as PlateNumberPieceName) && text.length === 3) {
                            refInput2.current?.focus();
                        }
                    }}
                />
            </View>
            <View style={[styles.inputWrapper, { width: "20%" }]}>
                <UniversalTextInput
                    ref={refInput2}
                    blurOnSubmit={false}
                    name="second"
                    placeholder="가"
                    value={plateNumber[1] ?? ""}
                    inputMode="text"
                    keyboardType="default"
                    textAlign="center"
                    highlightColor={
                        (plateNumber[1] !== null && plateNumber[1]?.length !== 1) ||
                        (plateNumber[1]?.length === 1 && validator.isKoreanConsonant(plateNumber[1]))
                            ? styles.unvalidInput.color
                            : undefined
                    }
                    lowlightColor={
                        (plateNumber[1] !== null && plateNumber[1]?.length !== 1) ||
                        (plateNumber[1]?.length === 1 && validator.isKoreanConsonant(plateNumber[1]))
                            ? styles.unvalidInput.color
                            : undefined
                    }
                    onChangeText={(text, name) => {
                        if (
                            validatePlateNumber(text, name as PlateNumberPieceName) &&
                            !validator.isKoreanConsonant(text) &&
                            text.length === 1
                        ) {
                            refInput3.current?.focus();
                        }
                    }}
                />
            </View>
            <View style={[styles.inputWrapper, { width: "45%" }]}>
                <UniversalTextInput
                    ref={refInput3}
                    blurOnSubmit={false}
                    name="third"
                    placeholder="0000"
                    value={plateNumber[2] ?? ""}
                    inputMode="numeric"
                    keyboardType="number-pad"
                    textAlign="center"
                    highlightColor={
                        plateNumber[2] !== null && plateNumber[2]?.length !== 4 ? styles.unvalidInput.color : undefined
                    }
                    lowlightColor={
                        plateNumber[2] !== null && plateNumber[2]?.length !== 4 ? styles.unvalidInput.color : undefined
                    }
                    onChangeText={(text, name) => validatePlateNumber(text, name as PlateNumberPieceName)}
                />
            </View>
        </View>
    );
}

type PlateNumberPieceName = "first" | "second" | "third";

class Validator extends StringValidator {
    public validatePieceOfPlateNumber(index: number, text: string): boolean {
        switch (index) {
            case 0:
                return /^(\d{2}|\d{3})$/.test(text);
            case 1:
                //console.log(/^([가-힣]{2,3})[가-힣]{1}$/.test(text));
                //return /^([가-힣]{2,3})[가-힣]{1}$/.test(text);
                return /^[가-힣]$/.test(text);
            case 2:
                return /\d{4}$/.test(text);
            default:
                return false;
        }
    }
}
