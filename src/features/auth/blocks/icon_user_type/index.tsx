import { StyleSheet, View, Text, Platform, ColorValue, TouchableOpacity, Animated } from "react-native";
import { IconRoundPeople, IconRoundPerson } from "../../../common/atoms/icon/human";
import { UserTypeSelectionButtonProps } from "./types";
import useStyler from "../../../common/hooks/styler/hooks";
import { VILLIFE_AUTHORITY } from "../../../../libs/rest_apis/villife/absc";
import { useEffect, useRef } from "react";
import { ANIMATION_DURATION_FAST_LV1, ANIMATION_DURATION_FAST_LV2 } from "../../../common/constants";

export default function UserTypeSelectionButton({
    caption,
    size,
    userType,
    selected,
    onPress,
}: UserTypeSelectionButtonProps) {
    const { theme } = useStyler();
    const color: ColorValue = selected ? theme.color.specified.blue : theme.color.specified.lightgrey;
    const scaleValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (selected) {
            const animation = Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 1.2,
                    duration: ANIMATION_DURATION_FAST_LV2,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValue, {
                    toValue: 1.15,
                    duration: ANIMATION_DURATION_FAST_LV1,
                    useNativeDriver: true,
                }),
            ]);

            animation.start();

            return () => {
                animation.reset();
            };
        }
    }, [scaleValue, selected]);

    let Icon = null;

    switch (userType) {
        case VILLIFE_AUTHORITY.ADMIN:
            Icon = IconRoundPerson;
            break;
        default:
            Icon = IconRoundPeople;
            break;
    }

    const styles = StyleSheet.create({
        container: {},
        wrapper: {
            width: size,
            height: size * 1.2,
            paddingVertical: size * 0.08,
            borderColor: color,
            borderRadius: size * 0.2,
            borderWidth: size * 0.05,
            backgroundColor: theme.color.specified.white,
            ...Platform.select({
                ios: {
                    shadowColor: theme.color.specified.darkgrey,
                    shadowOpacity: 0.4,
                    shadowRadius: size * 0.025,
                    shadowOffset: {
                        height: 6,
                        width: 0,
                    },
                },
                android: {
                    elevation: 15,
                },
            }),
        },
        iconBox: {
            flex: 5,
            alignItems: "center",
            justifyContent: "center",
        },
        captionBox: {
            flex: 5,
            alignItems: "center",
            justifyContent: "center",
        },
        caption: {
            color: color,
            fontFamily: theme.font.fontFamily.pretendard.extraBold,
            fontSize: size * 0.2,
        },
    });
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={() => onPress && onPress()}>
            <Animated.View
                style={[
                    styles.wrapper,
                    {
                        transform: [
                            {
                                scale: scaleValue,
                            },
                        ],
                    },
                ]}>
                <View style={styles.iconBox}>
                    <Icon color={color} size={size * 0.6} />
                </View>
                <View style={styles.captionBox}>
                    <Text style={styles.caption}>{caption}</Text>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
}
