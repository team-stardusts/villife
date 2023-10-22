import { Animated, Text, TouchableOpacity } from "react-native";
import { MFHistoryCardViewProps } from "./types";
import { View } from "react-native";
import { useEffect, useRef } from "react";
import { ANIMATION_DURATION_DEFAULT, ANIMATION_DURATION_FAST_LV2 } from "../../../../../../common/constants";
import useMFHistoryCardViewStyles from "./styles";
import { insertCommaToNumber } from "../../../../../../common/global_function";
import StardustDateParser from "../../../../../../../libs/date_parser";

export default function MFHistoryCardView(props: MFHistoryCardViewProps) {
    const styles = useMFHistoryCardViewStyles();
    const opacityValue = useRef(new Animated.Value(0)).current;
    const yValue = useRef(new Animated.Value(-15)).current;

    useEffect(() => {
        const animation = Animated.sequence([
            Animated.delay(ANIMATION_DURATION_FAST_LV2 * props.index),
            Animated.parallel([
                Animated.timing(opacityValue, {
                    toValue: 1,
                    duration: ANIMATION_DURATION_DEFAULT,
                    useNativeDriver: true,
                }),
                Animated.timing(yValue, {
                    toValue: 0,
                    duration: ANIMATION_DURATION_DEFAULT,
                    useNativeDriver: true,
                }),
            ]),
        ]);

        animation.start();

        return () => {
            animation.reset();
            animation.stop();
        };
    }, [opacityValue, yValue, props.totalCardCount]);

    const isNotiRequired = (): boolean => {
        const today = StardustDateParser.changeGMT(new Date(), "kr");

        return !(props.LastestNotiYear === today.getFullYear() && props.LastestNotiMonth === today.getMonth() + 1);
    };

    const isUnpaid = (): boolean => {
        //const today = StardustDateParser.changeGMT(new Date(), "kr");

        //return props.LastestPaidYear !== today.getFullYear() || props.LastestPaidMonth !== today.getMonth() + 1;
        return props.TotalUnpaidFee > 0;
    };

    function NotiMark() {
        return (
            <View style={styles.notimarkCircle}>
                <Text style={styles.notimark}>!</Text>
            </View>
        );
    }

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity: opacityValue,
                    transform: [
                        {
                            translateY: yValue,
                        },
                    ],
                },
            ]}>
            <TouchableOpacity style={styles.pressable} activeOpacity={0.6}>
                <View style={styles.row}>
                    <Text style={styles.roomNumber}>{props.RoomNumber}호</Text>
                </View>
                <View style={[styles.row]}>
                    <View style={styles.set}>
                        <Text style={styles.rowKey} adjustsFontSizeToFit numberOfLines={1}>
                            최근고지
                        </Text>
                        {isNotiRequired() && <NotiMark />}
                    </View>
                    <Text style={styles.rowValue}>
                        {props.LastestNotiYear}년 {props.LastestNotiMonth}월
                    </Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={styles.rowKey} adjustsFontSizeToFit numberOfLines={1}>
                        최근납부
                    </Text>
                    <Text style={styles.rowValue}>
                        {props.LastestPaidYear}년 {props.LastestPaidMonth}월
                    </Text>
                </View>
                <View style={[styles.row]}>
                    <View style={styles.set}>
                        <Text style={styles.rowKey} adjustsFontSizeToFit numberOfLines={1}>
                            미 납 금
                        </Text>
                        {isUnpaid() && <NotiMark />}
                    </View>
                    <Text style={styles.rowValue}>{insertCommaToNumber(props.TotalUnpaidFee)}원</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}
