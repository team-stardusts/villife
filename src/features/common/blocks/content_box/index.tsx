import { Animated, Platform, StyleSheet, View } from "react-native";
import { ContentBoxProps } from "./types";
import useStyler from "../../hooks/styler/hooks";
import { useEffect, useRef } from "react";
import { ANIMATION_DURATION_SLOW } from "../../constants";

export default function ContentBox({ children, backgroundColor }: ContentBoxProps) {
    const { deviceUI, theme } = useStyler();
    const opacityValue = useRef(new Animated.Value(0)).current;
    const translateYValue = useRef(new Animated.Value(15)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityValue, {
                toValue: 1,
                duration: ANIMATION_DURATION_SLOW,
                useNativeDriver: true,
            }),
            Animated.timing(translateYValue, {
                toValue: 0,
                duration: ANIMATION_DURATION_SLOW,
                useNativeDriver: true,
            }),
        ]).start();
    }, [opacityValue, translateYValue]);

    const styles = StyleSheet.create({
        box: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: deviceUI.moderateScale(15),
            marginBottom: deviceUI.moderateScale(15),
            backgroundColor: backgroundColor ?? theme.colorFamily.blue,
            ...Platform.select({
                ios: {
                    shadowColor: theme.colorFamily.darkgrey,
                    shadowOpacity: 0.3,
                    shadowRadius: deviceUI.moderateScale(2),
                    shadowOffset: {
                        height: 6,
                        width: 0,
                    },
                },
                android: {
                    elevation: 5,
                },
            }),
        },
    });
    return (
        <Animated.View
            style={[
                styles.box,
                {
                    opacity: opacityValue,
                    transform: [{ translateY: translateYValue }],
                },
            ]}>
            {children !== undefined ? children : <></>}
        </Animated.View>
    );
}
