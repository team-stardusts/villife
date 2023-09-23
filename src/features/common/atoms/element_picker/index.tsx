import { Animated, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView } from "react-native";
import { useEffect, useRef, useState } from "react";
import { ANIMATION_DURATION_FAST_LV2 } from "../../constants";
import { ElementPickerProps, Node, NodeProps } from "./types";
import useElementPickerStyles from "./styles";

export default function ElementPicker(props: ElementPickerProps) {
    if (props.numberOfElementsToShow < 1) {
        console.log("ElementPickerProps.NumberOfElementsToShow must be greater than 1.");
        return <></>;
    }

    // numberOfElementsToShows는 반드시 홀수여야함
    const numberOfElementsToShow =
        props.numberOfElementsToShow % 2 === 0 ? props.numberOfElementsToShow - 1 : props.numberOfElementsToShow;
    const scrollViewInnerWidth = props.width * 0.9;
    const scrollViewHorizontalMargin = props.width * 0.05;
    const nodeViewWidth = scrollViewInnerWidth / props.numberOfElementsToShow;
    const nulls = Array.from({ length: numberOfElementsToShow / 2 }, (_, __) => null);
    const _nodes = [...nulls, ...props.nodes, ...nulls];

    // Initial index가 nodes 길이보다 크다면 0으로 지정
    const _initialIndex =
        props.initialIndex === undefined ? 0 : props.initialIndex >= props.nodes.length ? 0 : props.initialIndex;
    const styles = useElementPickerStyles();
    const scrollVewRef = useRef<ScrollView | null>(null);
    const scrollValue = useRef(new Animated.Value(0)).current;

    const [crrNodeValue, setCrrNodeValue] = useState<Node>(props.nodes.length > 0 ? props.nodes[_initialIndex] : "");
    //const [crrNodeIndex, setCrrNodeIndex] = useState<number>(0);

    useEffect(() => {
        props.onNodeChange && props.onNodeChange(crrNodeValue);
    }, [crrNodeValue]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        Animated.event([{ nativeEvent: { contentOffset: { x: scrollValue } } }], {
            useNativeDriver: false,
        });
        const chunk = getCenterPosition(event);
        setCrrNodeValue(props.nodes[chunk.index]);
    };

    const handleScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const chunk = getCenterPosition(event);
        scrollVewRef.current?.scrollTo({ x: chunk.offsetX, animated: true });
    };

    const getCenterPosition = (event: NativeSyntheticEvent<NativeScrollEvent>): { index: number; offsetX: number } => {
        const offsetX: number = event.nativeEvent.contentOffset.x;

        let index: number = Math.round(offsetX / nodeViewWidth);

        if (index < 0 || index == -0) index = 0;
        // Data list 마지막 요소인 null 을 제거하기 위함
        // Data list에 실제 데이터가 0 부터 10이 들어가더라도 0, max index에
        // null이 있으므로, Length는 11이 아닌 13이 됨
        if (index >= _nodes.length - 2) index = _nodes.length - 3;

        let correctOffsetX = index * nodeViewWidth;

        return {
            index: index,
            offsetX: correctOffsetX,
        };
    };
    return (
        <ScrollView
            ref={scrollVewRef}
            style={[
                styles.main.container,
                {
                    width: scrollViewInnerWidth,
                    marginHorizontal: scrollViewHorizontalMargin,
                },
            ]}
            contentOffset={{
                x: props.initialIndex ? props.initialIndex * nodeViewWidth : 0,
                y: 0,
            }}
            onScroll={handleScroll}
            onScrollEndDrag={handleScrollEndDrag}
            scrollEventThrottle={16}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            {_nodes.map((node, index) => (
                <ElementNode
                    key={index}
                    styles={styles.node}
                    width={nodeViewWidth}
                    isFocused={node === crrNodeValue}
                    value={node}
                    focusedcolor={props.focusedcolor || styles.main.focused.color}
                    unFocusedColor={props.unFocusedColor || styles.main.unfocused.color}
                    onTapToSelect={(node) => {
                        if (node) setCrrNodeValue(node);
                        const toIndex = _nodes.indexOf(node) - nulls.length;
                        if (toIndex < 0) return;
                        scrollVewRef.current?.scrollTo({ x: nodeViewWidth * toIndex, animated: true });
                    }}
                />
            ))}
        </ScrollView>
    );
}

function ElementNode(props: NodeProps) {
    const FOCUSED_FONT_SCALE = 2;
    const UNFOCUSED_FONT_SCALE = 0.8;

    const viewWidth = props.width * 0.85;
    const viewMarginHorizontal = (props.width * 0.15) / 2;
    const fontSizeValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const toValue = props.isFocused ? FOCUSED_FONT_SCALE : UNFOCUSED_FONT_SCALE;

        Animated.timing(fontSizeValue, {
            toValue,
            duration: ANIMATION_DURATION_FAST_LV2,
            useNativeDriver: true,
        }).start();
    }, [props.isFocused]);

    return (
        <Pressable
            //disabled
            onPress={() => {
                props.onTapToSelect(props.value);
            }}
            style={[
                props.styles.container,
                {
                    width: viewWidth,
                    marginHorizontal: viewMarginHorizontal,
                },
            ]}>
            {props.value !== null && (
                <Animated.Text
                    style={[
                        props.styles.node,
                        {
                            color: props.isFocused ? props.focusedcolor : props.unFocusedColor,
                            transform: [{ scale: fontSizeValue }],
                        },
                    ]}
                    numberOfLines={1}
                    adjustsFontSizeToFit>
                    {props.value}
                </Animated.Text>
            )}
        </Pressable>
    );
}
