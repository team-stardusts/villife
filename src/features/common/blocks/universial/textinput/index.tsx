import { ForwardedRef, forwardRef, useState } from "react";
import {
    ColorValue,
    NativeSyntheticEvent,
    TextInput as OriginTextInput,
    TextInputChangeEventData,
    TextInputFocusEventData,
} from "react-native/types";
import TextInput from "../../../atoms/textinput";
import UniversalTextInputProps from "./types";
import { StyleSheet } from "react-native";
import useStyler from "../../../hooks/styler/hooks";

const UniversalTextInput = forwardRef((props: UniversalTextInputProps, ref: ForwardedRef<OriginTextInput>) => {
    const { deviceUI, theme } = useStyler();
    const [isFocusing, setIsFocusing] = useState<boolean>(false);
    const { highlightColor, lowlightColor } = props;

    /* 
    const animatedBorderWidth = useRef(new Animated.Value(1)).current;
    useEffect(() => {
        let toValue = isFocusing ? deviceUI.moderateScale(2) : deviceUI.moderateScale(1);

        Animated.timing(animatedBorderWidth, {
            toValue: toValue,
            duration: ANIMATION_DURATION_FAST_LV2,
            useNativeDriver: false,
        }).start();

        return () => {
            animatedBorderWidth.stopAnimation();
        };
    }, [isFocusing]); */

    const styles = StyleSheet.create({
        /* container: {
            flex: 1,
            minHeight: deviceUI.moderateScale(30),
            borderRadius: deviceUI.moderateScale(8),
            borderColor: isFocusing
                ? highlightColor ?? theme.color.specified.blue
                : lowlightColor ?? theme.color.specified.lightgrey,
            justifyContent: "center",
            paddingHorizontal: deviceUI.moderateScale(1),
        }, */
        input: {
            height: "100%",
            width: "100%",
            minHeight: deviceUI.moderateScale(20),
            textAlignVertical: "center",
            backgroundColor: theme.color.specified.white,
            borderRadius: deviceUI.moderateScale(8),
            borderWidth: isFocusing ? deviceUI.moderateScale(2) : deviceUI.moderateScale(1),
            borderColor: isFocusing
                ? highlightColor ?? theme.color.specified.blue
                : lowlightColor ?? theme.color.specified.lightgrey,
            paddingHorizontal: deviceUI.moderateScale(10),
            fontFamily: theme.font.fontFamily.pretendard.regular,
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

    const getPlaceholderTextColor = (): ColorValue => {
        if (props.placeholderTextColor) return props.placeholderTextColor;

        return theme.color.specified.lightgrey;
    };

    return (
        <TextInput
            ref={ref}
            style={[styles.input]}
            {...props}
            placeholderTextColor={getPlaceholderTextColor()}
            onChange={onChange}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            allowFontScaling
        />
    );
});

export default UniversalTextInput;
{
    /* <Animated.View style={[styles.container, { borderWidth: animatedBorderWidth }]}>
        </Animated.View> */
}
