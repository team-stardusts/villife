import { useEffect, useRef, useState } from "react";
import { FloorSetterRowProps } from "../types";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import Icon from "../../../../../../../common/atoms/icon";
import { ANIMATION_DURATION_FAST_LV2 } from "../../../../../../../common/constants";
import RoomsSettingModal from "./modal";

export default function FloorSetterRow(props: FloorSetterRowProps) {
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
            <RoomsSettingModal
                initialRooms={props.rooms}
                modalVisible={visible}
                setModalVisible={setVisible}
                onChangeRoomCount={setRooms}
            />
            <View style={props.styles.floorBox}>
                <Text style={props.styles.rowText}>{props.floor === 0 ? "반지하" : `${props.floor} 층`}</Text>
            </View>
            <View style={props.styles.roomBox}>
                <View style={props.styles.roomsWrapper}>
                    <Text style={props.styles.rowText}>{rooms}호</Text>
                </View>
            </View>
            <View style={props.styles.blankBox}>
                <View style={props.styles.roomsSettingBtnWrapper}>
                    <TouchableOpacity
                        style={props.styles.roomsSettingBtn}
                        activeOpacity={0.5}
                        onPress={() => {
                            setVisible(true);
                        }}>
                        <Icon
                            name="arrow-down"
                            size={props.styles.roomsSettingIcon.width}
                            color={props.styles.roomsSettingIcon.color}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
}
