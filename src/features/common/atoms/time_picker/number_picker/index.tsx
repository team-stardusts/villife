import {
    Animated,
    ColorValue,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { NumberPickerProps } from "./types";
import { useEffect, useRef, useState } from "react";
import useStyler from "../../../hooks/styler/hooks";

type NumberNodeProps = {
    height: number;
    value: number | null;
    isFocused: boolean;
    isBiggerThanFocusedNode: boolean;
    focusedcolor: ColorValue;
    unFocusedColor: ColorValue;
};

function NumberNode({
    height,
    value,
    isFocused,
    isBiggerThanFocusedNode,
    focusedcolor,
    unFocusedColor,
}: NumberNodeProps) {
    const ANIMATION_DURATION: number = 200;
    const UNFOCUSED_SCALE: number = 0.8;
    const FOCUSED_SCALE: number = 2;

    const viewHeight = height * 0.85;
    const viewBottomMargin = height * 0.15;

    const animatedFontSize = useRef(new Animated.Value(1)).current;
    const { theme } = useStyler();

    useEffect(() => {
        let toValue = UNFOCUSED_SCALE;
        if (isFocused) toValue = FOCUSED_SCALE;

        Animated.timing(animatedFontSize, {
            toValue: toValue,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start();
    }, [isFocused]);

    const styles = StyleSheet.create({
        numberContainer: {
            width: "100%",
            height: viewHeight,
            marginBottom: viewBottomMargin,
            justifyContent: "center",
            alignItems: "center",
        },
        number: {
            color: isFocused ? focusedcolor : unFocusedColor,
            fontWeight: "bold",
            ...theme.font.researved.h5,
        },
    });
    return (
        <View
            style={[
                styles.numberContainer,
                {
                    justifyContent: isFocused ? "center" : isBiggerThanFocusedNode ? "flex-start" : "flex-end",
                },
            ]}>
            {value !== null && (
                <Animated.Text
                    style={[
                        styles.number,
                        {
                            transform: [{ scale: animatedFontSize }],
                        },
                    ]}>
                    {value >= 10 ? value : `0${value}`}
                </Animated.Text>
            )}
        </View>
    );
}

export default function NumberPicker({
    height,
    numbers,
    initialIndex,
    focusedcolor,
    unFocusedColor,
    onNumberChange,
}: NumberPickerProps) {
    const scrollViewInnerHeight = height * 0.9;
    const scrollViewVerticalMargin = height * 0.05;
    const numberViewHeight = scrollViewInnerHeight / 3;

    // Initial index가 numbers의 길이보다 크다면 0으로 지정
    const _initialIndex = initialIndex === undefined ? 0 : initialIndex >= numbers.length ? 0 : initialIndex;

    const { deviceUI, theme } = useStyler();
    const scrollRef = useRef<ScrollView | null>(null);
    const scrollAnimatedValue = useRef(new Animated.Value(0)).current;

    const [crrValue, setCrrValue] = useState<number>(numbers.length > 0 ? numbers[_initialIndex] : 0);
    const _numbers = [null, ...numbers, null];

    useEffect(() => {
        onNumberChange !== undefined && onNumberChange(crrValue);
    }, [crrValue]);

    const getCenterPosition = (event: NativeSyntheticEvent<NativeScrollEvent>): { index: number; offsetY: number } => {
        const offsetY: number = event.nativeEvent.contentOffset.y;

        let index: number = Math.round(offsetY / numberViewHeight);

        if (index < 0 || index == -0) index = 0;
        // Data list 마지막 요소인 null 을 제거하기 위함
        // Data list에 실제 데이터가 0 부터 10이 들어가더라도 0, max index에
        // null이 있으므로, Length는 11이 아닌 13이 됨
        if (index >= _numbers.length - 2) index = _numbers.length - 3;

        let correctOffsetY = index * numberViewHeight;

        return {
            index: index,
            offsetY: correctOffsetY,
        };
    };

    const androidPositionSettingFunction = {
        onMomentumScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>): void {
            const chunk = getCenterPosition(event);
            scrollRef.current?.scrollTo({ y: chunk.offsetY, animated: true });
        },
    };

    const iosPositionSettingFunction = {
        onScrollEndDrag(event: NativeSyntheticEvent<NativeScrollEvent>): void {
            const chunk = getCenterPosition(event);
            scrollRef.current?.scrollTo({ y: chunk.offsetY, animated: true });
        },
    };

    const scrollViewPosionSettingFunction =
        deviceUI.platform === "android" ? androidPositionSettingFunction : iosPositionSettingFunction;

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: scrollViewInnerHeight,
            marginVertical: scrollViewVerticalMargin,
        },
    });

    return (
        <ScrollView
            contentOffset={{ x: 0, y: initialIndex ? initialIndex * numberViewHeight : 0 }}
            ref={scrollRef}
            style={styles.container}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(event) => {
                Animated.event([{ nativeEvent: { contentOffset: { y: scrollAnimatedValue } } }], {
                    useNativeDriver: false,
                });
                const chunk = getCenterPosition(event);
                setCrrValue(numbers[chunk.index]);
            }}
            {...scrollViewPosionSettingFunction}>
            {_numbers.map((number, index) => (
                <NumberNode
                    key={index}
                    height={numberViewHeight}
                    isFocused={number === crrValue}
                    isBiggerThanFocusedNode={(number as number) >= crrValue}
                    value={number}
                    focusedcolor={focusedcolor || theme.colorFamily.black}
                    unFocusedColor={unFocusedColor || theme.colorFamily.grey}
                />
            ))}
        </ScrollView>
    );
}
