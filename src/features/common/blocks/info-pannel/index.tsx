import { Animated, Text, View } from "react-native";
import { Callback, IconChunk, Info, InfoPannelProps } from "./types";
import useInfoPannelStyles from "./styles";
import { FlatList } from "react-native";
import Icon from "../../atoms/icon";
import { useEffect, useMemo, useRef, useState } from "react";

export default function InfoPannel(props: InfoPannelProps) {
    const styles = useInfoPannelStyles();
    const height = styles.container.height;
    const [crrIndex, setCrrIndex] = useState<number | null>(null);
    const snapToOffset = useMemo(
        () => Array.from(Array(props.infos.length)).map((_, index) => index * height),
        [props.infos]
    );
    const flatListRef = useRef<FlatList>(null);
    // 마지막 인덱스에서 0번 인덱스로 넘어올때
    // Scroll animation을 비활성화 한 대신 어색해보이지 않도록 별도의 애니메이션을 추가함
    const translateY = useRef(new Animated.Value(height)).current;
    const translateYInterpolate = translateY.interpolate({
        inputRange: [0, height * 0.5, height],
        outputRange: [0, height * 0.2, height],
    });

    useEffect(() => {
        if (crrIndex === null) return;

        if (crrIndex !== snapToOffset.length) {
            flatListRef.current?.scrollToOffset({
                animated: crrIndex !== 0, // Index 0에 도달했을때 스크롤이 올라가는걸 방지
                offset: snapToOffset[crrIndex],
            });
        }

        if (crrIndex === 0) {
            const anmiationHandler = Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            });
            anmiationHandler.start();

            return () => anmiationHandler.reset();
        }
    }, [crrIndex, snapToOffset]);

    useInterval(() => {
        setCrrIndex((prev) => {
            if (prev === null) return 0;
            return prev === snapToOffset.length - 1 ? 0 : prev + 1;
        });
    }, 7000);

    const getIconChunk = (type: Info["type"]): IconChunk => {
        const chunk: IconChunk = {
            name: "caution-mark",
            color: styles.info.color,
        };

        switch (type) {
            case "warning":
                chunk.color = styles.warning.color;
                return chunk;
            case "danger":
                chunk.color = styles.danger.color;
                return chunk;
            default:
                return chunk;
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={props.infos}
                renderItem={({ item }) => (
                    <Animated.View
                        style={[
                            styles.wrapper,
                            crrIndex === 0 && {
                                transform: [
                                    {
                                        translateY: translateYInterpolate,
                                    },
                                ],
                            },
                        ]}>
                        <View style={[styles.iconBox, { backgroundColor: getIconChunk(item.type).color }]}>
                            <Icon
                                name={getIconChunk(item.type).name}
                                size={styles.icon.width}
                                color={styles.icon.color}
                            />
                        </View>
                        <Text style={styles.message} adjustsFontSizeToFit numberOfLines={1}>
                            {item.message}
                        </Text>
                    </Animated.View>
                )}
                //onEndReachedThreshold={0} // 끝에 도달했을때 동작
                scrollEnabled={false}
                snapToOffsets={snapToOffset}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

function useInterval(callback: Callback, delay: number | null) {
    const savedCallback = useRef<Callback>(() => {});

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
