import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import useScreenMessage from "../../../../../hooks/multilingual/hooks";
import useSystemInfo from "../../../../../hooks/systeminfo/hooks";
import useAppTheme from "../../../../../hooks/themes/hooks";
import StringValidator from "../../../../../libs/string_validator";
import Badge from "../../../../atoms/badge";
import ValidatorProps from "./types";

export default function TextInputValidators(props: ValidatorProps) {
    const sysinfo = useSystemInfo();
    const theme = useAppTheme().colors.colorFamily;
    const validator = new StringValidator();

    const validBgColor = theme.lightblue;
    const invalidBgColor = theme.lightgrey;
    const validFontColor = theme.white;
    const invalidFontColor = theme.black;

    const { title, text, examine, size, matchingText, onValidate } = props;
    const _size = size ?? sysinfo.window.width * 0.035;

    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        if (text === null) {
            return;
        }

        switch (examine) {
            case "hasEnglish":
                setIsValid(validator.hasAlpha(text));
                break;
            case "hasEnglishOnlySmallCase":
                setIsValid(validator.hasAlpha(text) && !validator.hasAlphaLargeCase(text));
                break;
            case "hasNumber":
                setIsValid(validator.hasNumber(text));
                break;
            case "hasSpecialChar":
                setIsValid(validator.hasSpecialChar(text));
                break;
            case "tokens4to10":
                setIsValid(validator.isLengthWithinRange(text, 4, 10));
                break;
            case "tokens8to20":
                setIsValid(validator.isLengthWithinRange(text, 8, 20));
                break;
            default:
                setIsValid(text === matchingText && matchingText !== "");
                break;
        }

        return;
    });

    return (
        <View style={{ marginRight: _size * 0.5 }}>
            <Badge
                title={title}
                size={_size}
                bgColor={isValid ? validBgColor : invalidBgColor}
                color={isValid ? validFontColor : invalidFontColor}
            />
        </View>
    );
}
