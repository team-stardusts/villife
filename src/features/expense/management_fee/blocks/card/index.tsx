import { Animated, Text, TouchableOpacity } from "react-native";
import { MFHistoryCardViewProps } from "./types";
import { View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { ANIMATION_DURATION_DEFAULT, ANIMATION_DURATION_FAST_LV2 } from "../../../../common/constants";
import useMFHistoryCardViewStyles from "./styles";
import { insertCommaToNumber } from "../../../../common/global_function";
import StardustDateParser from "../../../../../libs/date_parser";
import Icon from "../../../../common/atoms/icon";

export default function MFHistoryCardView(props: MFHistoryCardViewProps) {
    const opacityValue = useRef(new Animated.Value(0)).current;
    const yValue = useRef(new Animated.Value(-15)).current;
    const [isChecked, setIsChecked] = useState<boolean | null>(null);
    const styles = useMFHistoryCardViewStyles(isChecked, props.checkmode);

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

    useEffect(() => {
        props.checkmode && isChecked !== null && props.checkmode.onCheck(isChecked);
    }, [isChecked]);

    const isNotiRequired = (): boolean => {
        const today = StardustDateParser.changeGMT(new Date(), "kr");

        return !(props.lastest_noti_year === today.getFullYear() && props.lastest_noti_month === today.getMonth() + 1);
    };

    const isUnpaid = (): boolean => {
        //const today = StardustDateParser.changeGMT(new Date(), "kr");

        //return props.LastestPaidYear !== today.getFullYear() || props.LastestPaidMonth !== today.getMonth() + 1;
        return props.total_unpaid_fee > 0;
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
            <TouchableOpacity
                style={styles.pressable}
                activeOpacity={0.6}
                onPress={() => {
                    if (props.checkmode) {
                        setIsChecked(isChecked === null ? true : !isChecked);
                    }
                }}
                disabled={props.checkmode !== undefined ? props.checkmode.disabled : true}>
                <View style={styles.row}>
                    <Text style={styles.roomNumber}>{props.room_number}호</Text>
                    {props.checkmode && (
                        <View style={styles.checkIndicator}>
                            <Icon name="check" size={styles.checkIcon.width} color={styles.checkIcon.color} />
                        </View>
                    )}
                </View>
                <View style={[styles.row]}>
                    <View style={styles.set}>
                        <Text style={styles.rowKey} adjustsFontSizeToFit numberOfLines={1}>
                            최근고지
                        </Text>
                        {isNotiRequired() && <NotiMark />}
                    </View>
                    <Text style={styles.rowValue}>
                        {props.lastest_noti_year}년 {props.lastest_noti_month}월
                    </Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={styles.rowKey} adjustsFontSizeToFit numberOfLines={1}>
                        최근납부
                    </Text>
                    <Text style={styles.rowValue}>
                        {props.lastest_paid_year}년 {props.lastest_paid_month}월
                    </Text>
                </View>
                <View style={[styles.row]}>
                    <View style={styles.set}>
                        <Text style={styles.rowKey} adjustsFontSizeToFit numberOfLines={1}>
                            미 납 금
                        </Text>
                        {isUnpaid() && <NotiMark />}
                    </View>
                    <Text style={styles.rowValue}>{insertCommaToNumber(props.total_unpaid_fee || 0) + "원"}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}
