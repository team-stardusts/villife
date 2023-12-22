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

    useEffect(() => {
        if (props.checkmode && !props.checkmode.disabled) {
            if (typeof props.checkmode.checkAll === "boolean") {
                setIsChecked(props.checkmode.checkAll);
                return;
            }
        }
    }, [props.checkmode?.checkAll]);

    const isNotiRequired = (): boolean => {
        const today = StardustDateParser.changeGMT(new Date(), "kr");

        return !(props.lastestNotiYear === today.getFullYear() && props.lastestNotiMonth === today.getMonth() + 1);
    };

    const isUnpaid = (): boolean => {
        //const today = StardustDateParser.changeGMT(new Date(), "kr");

        //return props.LastestPaidYear !== today.getFullYear() || props.LastestPaidMonth !== today.getMonth() + 1;
        return props.totalUnpaidFee > 0;
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
                    <Text style={styles.roomNumber}>{props.roomNumber}호</Text>
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
                        {props.lastestNotiYear === undefined || props.lastestNotiMonth === undefined
                            ? "고지이력 없음"
                            : `${props.lastestNotiYear}년 ${props.lastestNotiMonth}월`}
                    </Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={styles.rowKey} adjustsFontSizeToFit numberOfLines={1}>
                        최근납부
                    </Text>
                    <Text style={styles.rowValue}>
                        {props.lastestPaidYear === undefined || props.lastestPaidMonth === undefined
                            ? "납부이력 없음"
                            : `${props.lastestPaidYear}년 ${props.lastestPaidMonth}월`}
                    </Text>
                </View>
                <View style={[styles.row]}>
                    <View style={styles.set}>
                        <Text style={styles.rowKey} adjustsFontSizeToFit numberOfLines={1}>
                            미 납 금
                        </Text>
                        {isUnpaid() && <NotiMark />}
                    </View>
                    <Text style={styles.rowValue}>{insertCommaToNumber(props.totalUnpaidFee || 0) + "원"}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}
