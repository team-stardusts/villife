import { useEffect, useRef, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData, TextInputFocusEventData } from "react-native/types";
import TextInput from "../../../atoms/textinput";
import useUniversialTextinputStyles from "./styles";
import UniversalTextInputProps from "./types";
import { StyleSheet } from "react-native";
import useStyler from "../../../hooks/styler/hooks";
import { Animated } from "react-native";

export default function UniversalTextInput(props: UniversalTextInputProps) {
    const { deviceUI, theme } = useStyler();
    const animatedBorderWidth = useRef(new Animated.Value(1)).current;
    const [isFocusing, setIsFocusing] = useState<boolean>(false);

    const { highlightColor, lowlightColor } = props;

    useEffect(() => {
        let toValue = isFocusing ? deviceUI.moderateScale(2) : deviceUI.moderateScale(1);

        Animated.timing(animatedBorderWidth, {
            toValue: toValue,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocusing, animatedBorderWidth]);

    const styles = StyleSheet.create({
        container: {
            borderRadius: deviceUI.moderateScale(8),
            borderColor: isFocusing
                ? highlightColor ?? theme.colorFamily.blue
                : lowlightColor ?? theme.colorFamily.lightgrey,
            ...theme.font.researved.h5,
            padding: 1,
        },
        input: {
            borderRadius: deviceUI.moderateScale(8),
            backgroundColor: theme.colorFamily.white,
            height: deviceUI.moderateScale(26),
            paddingVertical: deviceUI.moderateScale(2),
            paddingHorizontal: deviceUI.moderateScale(4),
        },
    });
    //const styles = useUniversialTextinputStyles({ isFocusing, highlightColor, lowlightColor });

    const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        if (props.onChange) {
            props.onChange(e, props.name);
        }
    };

    const onChangeText = (text: string) => {
        if (props.onChangeText) {
            props.onChangeText(text, props.name);
        }
    };

    const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocusing(true);

        if (props.onFocus) {
            props.onFocus(e);
        }
    };

    const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocusing(false);

        if (props.onBlur) {
            props.onBlur(e);
        }
    };

    return (
        <Animated.View style={[styles.container, { borderWidth: animatedBorderWidth }]}>
            <TextInput
                style={[props.style, styles.input]}
                {...props}
                onChange={onChange}
                onChangeText={onChangeText}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </Animated.View>
    );
}
