import { Animated, StyleSheet, View } from "react-native";
import useStyler from "../../hooks/styler/hooks";
import { useEffect, useRef } from "react";
import { IndicatorProps, PageIndicatorsProps } from "./types";

function Indicator({ isOn, size }: IndicatorProps) {
    const { theme } = useStyler();
    const SCALE_INITIAL_VALUE: number = 1;
    const DURATION: number = 200;
    const scaleValue = useRef(new Animated.Value(SCALE_INITIAL_VALUE)).current;

    useEffect(() => {
        const toValue = isOn ? SCALE_INITIAL_VALUE * 1.15 : SCALE_INITIAL_VALUE;

        Animated.timing(scaleValue, {
            toValue: toValue,
            duration: DURATION,
            useNativeDriver: true,
        }).start();
    }, [isOn, scaleValue]);

    const styles = StyleSheet.create({
        indicator: {
            marginHorizontal: size * 0.3,
            backgroundColor: isOn ? theme.colorFamily.white : theme.colorFamily.lightblue,
            width: size,
            height: size,
            borderRadius: size,
        },
    });

    return (
        <Animated.View
            style={[
                styles.indicator,
                {
                    transform: [{ scale: scaleValue }],
                },
            ]}
        />
    );
}

export default function PageIndicators({ length, currentIndex, size }: PageIndicatorsProps) {
    const styles = StyleSheet.create({
        indicatorsBox: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
        },
    });

    return (
        <View style={styles.indicatorsBox}>
            {Array(length)
                .fill(null)
                .map((value, index) => (
                    <Indicator key={index} isOn={index === currentIndex} size={size} />
                ))}
        </View>
    );
}
