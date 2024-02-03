import { useEffect, useRef, useState } from "react";
import { FloorSetterRowProps } from "../types";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import Icon from "../../../../../../../common/atoms/icon";
import { ANIMATION_DURATION_FAST_LV2 } from "../../../../../../../common/constants";
import HorizontalNumberPickingModal from "../../../../../../../common/blocks/modal/horizontal_number";

export default function FloorSetterRow(props: FloorSetterRowProps) {
    const roomRange = Array.from({ length: 51 }, (_, k) => k);
    const [rooms, setRooms] = useState<number>(props.rooms);
    const [visible, setVisible] = useState<boolean>(false);
    const opacityValue = useRef(new Animated.Value(0)).current;
    const translateYValue = useRef(new Animated.Value(8)).current;

    useEffect(() => {
        if (visible === false) {
            props.onChangeRoomCount(rooms);
        }
    }, [visible]);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityValue, {
                toValue: 1,
                duration: ANIMATION_DURATION_FAST_LV2,
                useNativeDriver: true,
            }),
            Animated.timing(translateYValue, {
                toValue: 0,
                duration: ANIMATION_DURATION_FAST_LV2,
                useNativeDriver: true,
            }),
        ]).start();
    }, [opacityValue, translateYValue]);

    return (
        <Animated.View
            style={[props.styles.rowContaier, { opacity: opacityValue, transform: [{ translateY: translateYValue }] }]}>
            <HorizontalNumberPickingModal
                initialIndex={roomRange.indexOf(props.rooms)}
                numbersRange={roomRange}
                modalVisible={visible}
                setModalVisible={setVisible}
                onChangeNumber={setRooms}
            />
            <View style={props.styles.floorBox}>
                <Text style={props.styles.rowText}>{props.floor === 0 ? "반지하" : `${props.floor} 층`}</Text>
            </View>
            <View style={props.styles.roomBox}>
                <TouchableOpacity
                    style={props.styles.roomsSettingBtn}
                    activeOpacity={0.5}
                    onPress={() => {
                        setVisible(true);
                    }}>
                    <View style={props.styles.roomsWrapper}>
                        <Text style={props.styles.rowText}>{rooms}호</Text>
                    </View>
                    <View style={props.styles.roomsSettingIconWrapper}>
                        <Icon
                            name="arrow-down"
                            size={props.styles.roomsSettingIcon.width}
                            color={props.styles.roomsSettingIcon.color}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}
