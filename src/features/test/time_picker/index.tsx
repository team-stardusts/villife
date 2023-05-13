import { useEffect, useRef, useState } from "react";
import {
    Animated,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ContentBox from "../../common/blocks/content_box";
import { TimePickerProps } from "./types";

const WIDTH = 300;
const HOURS = [null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, null];

export default function TimePicker({ height }: TimePickerProps) {
    const scrollViewHeight = height * 0.9;
    const scrollViewVerticalMargin = height * 0.05;
    const numberCardHeight = (scrollViewHeight / 3) * 0.85;
    const numberCardBottomMargin = (scrollViewHeight / 3) * 0.15;
    const scrollRef = useRef<ScrollView | null>(null);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const animatedFontSize = useRef(new Animated.Value(15));
    const [crrIndex, setCrrIndex] = useState<number>(0);

    useEffect(() => {
        if (scrollRef !== null) {
            //console.log(scrollRef.current);
        }
    }, [scrollRef]);

    const getCenterPosition = (event: NativeSyntheticEvent<NativeScrollEvent>): { index: number; offsetY: number } => {
        const offsetY: number = event.nativeEvent.contentOffset.y;
        const numberCardRealHeight = numberCardHeight + numberCardBottomMargin;

        let index: number = Math.round(offsetY / numberCardRealHeight);

        if (index < 0 || index == -0) index = 0;
        // Data list 마지막 요소인 null 을 제거하기 위함
        // Data list에 실제 데이터가 0 부터 10이 들어가더라도 0, max index에
        // null이 있으므로, Length는 11이 아닌 13이 됨
        if (index >= HOURS.length - 2) index = HOURS.length - 3;

        let correctOffsetY = index * numberCardRealHeight;

        return {
            index: index,
            offsetY: correctOffsetY,
        };
    };

    const styles = StyleSheet.create({
        container: {
            width: "100%",
            height: scrollViewHeight,
            marginVertical: scrollViewVerticalMargin,
        },
        numberContainer: {
            width: "100%",
            height: numberCardHeight,
            marginBottom: numberCardBottomMargin,
            justifyContent: "center",
            alignItems: "center",
        },
        focusedNumber: {
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
        },
        unfocusedNumber: {
            color: "lightgrey",
            fontSize: 15,
            fontWeight: "bold",
        },
    });

    return (
        <ContentBox>
            <ScrollView
                ref={scrollRef}
                style={styles.container}
                onScroll={(event) => {
                    Animated.event([{ nativeEvent: { contentOffset: { y: animatedValue } } }], {
                        useNativeDriver: false,
                    });
                    const chunk = getCenterPosition(event);
                    setCrrIndex(chunk.index);
                }}
                onScrollEndDrag={(event) => {
                    const chunk = getCenterPosition(event);
                    scrollRef.current?.scrollTo({ y: chunk.offsetY, animated: true });
                }}
                scrollEventThrottle={16}>
                {HOURS.map((value, index) => (
                    <View
                        key={index}
                        style={[
                            styles.numberContainer,
                            {
                                justifyContent:
                                    value === crrIndex
                                        ? "center"
                                        : (value as number) > crrIndex
                                        ? "flex-start"
                                        : "flex-end",
                            },
                        ]}>
                        <Text style={value === crrIndex ? styles.focusedNumber : styles.unfocusedNumber}>{value}</Text>
                    </View>
                ))}
            </ScrollView>
        </ContentBox>
    );
}
