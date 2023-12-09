import { Animated, View } from "react-native";
import { SpinnerCircleProps, SpinnerProps } from "./types";
import { useCallback, useEffect, useRef, useState } from "react";
import useInterval from "../../hooks/utility/interval";

export default function Spinner(props: SpinnerProps) {
    const defaultSize = 100;
    const dummyArr = Array(20).fill(null);

    return (
        <View
            style={{
                width: props.size ?? defaultSize,
                height: props.size ?? defaultSize,
                justifyContent: "center",
                alignItems: "center",
                transform: [{ rotateZ: "90deg" }],
            }}>
            {dummyArr.map((_, index) => (
                <SpinnerCircle
                    key={index}
                    index={index}
                    totalCount={dummyArr.length}
                    size={props.size ?? defaultSize}
                    color={props.color ?? "lightgrey"}
                />
            ))}
        </View>
    );
}

function SpinnerCircle(props: SpinnerCircleProps) {
    const opacityValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(0)).current;
    const degree = (360 / props.totalCount) * (props.index + 1);
    const duration = 400;
    const delay = (duration / 10) * props.totalCount;
    const timeout = (delay / props.totalCount) * props.index;

    /* useEffect(() => {
        const animation = getAnimation();

        return () => {
            animation.stop();
            opacityValue.stopAnimation();
            scaleValue.stopAnimation();
        };
    }, []); */

    useInterval(() => {
        const animation = getAnimation();
        setTimeout(() => animation.start(), timeout);

        return () => {
            animation.stop();
            animation.reset();
        };
    }, delay);

    const getAnimation = useCallback(() => {
        return Animated.sequence([
            Animated.parallel([
                Animated.timing(opacityValue, {
                    toValue: 1,
                    duration: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.timing(scaleValue, {
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityValue, {
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: true,
                }),
            ]),
        ]);
    }, [opacityValue, scaleValue]);

    return (
        <View
            style={{
                position: "absolute",
                width: "100%",
                transform: [{ rotateZ: `${degree}deg` }],
            }}>
            <Animated.View
                style={{
                    width: props.size * 0.1,
                    height: props.size * 0.1,
                    borderRadius: props.size * 0.1,
                    backgroundColor: props.color,
                    opacity: opacityValue,
                    transform: [{ scale: scaleValue }],
                }}
            />
        </View>
    );
}
