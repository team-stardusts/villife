import { Text, View } from "react-native";
import { Callback, IconChunk, Info, InfoPannelProps } from "./types";
import useInfoPannelStyles from "./styles";
import { FlatList } from "react-native";
import Icon from "../../atoms/icon";
import { useEffect, useMemo, useRef, useState } from "react";

export default function InfoPannel(props: InfoPannelProps) {
    const styles = useInfoPannelStyles();
    const height = styles.container.height;
    const snapToOffset = useMemo(
        () => Array.from(Array(props.infos.length)).map((_, index) => index * height),
        [props.infos]
    );
    const [crrIndex, setCrrIndex] = useState<number>(0);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (crrIndex !== snapToOffset.length) {
            flatListRef.current?.scrollToOffset({
                animated: true,
                offset: snapToOffset[crrIndex],
            });
        }
    }, [crrIndex, snapToOffset]);

    useInterval(() => {
        setCrrIndex((prev) => (prev === snapToOffset.length - 1 ? 0 : prev + 1));
    }, 5000);

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
                    <View style={styles.wrapper}>
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
                    </View>
                )}
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
