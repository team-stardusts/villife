import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import {
    ANIMATION_DURATION_DEFAULT,
    ANIMATION_DURATION_FAST_LV3,
    ANIMATION_DURATION_SLOW,
} from "../../../../common/constants";
import useStyler from "../../../../common/hooks/styler/hooks";

export default function SpinningWon({ size }: SpinningWonProps) {
    const styles = useSpinningWonStyles(size || 20);

    const unitRotaionValue = useRef(new Animated.Value(0)).current;
    const interpolate = unitRotaionValue.interpolate({
        inputRange: [0, 0.25, 0.5, 0.75, 1],
        outputRange: ["0deg", "90deg", "180deg", "270deg", "360deg"],
    });

    useEffect(() => {
        const animation = Animated.sequence([
            Animated.timing(unitRotaionValue, {
                toValue: 1,
                duration: ANIMATION_DURATION_FAST_LV3,
                useNativeDriver: true,
            }),
            Animated.timing(unitRotaionValue, {
                toValue: 2,
                duration: ANIMATION_DURATION_DEFAULT,
                useNativeDriver: true,
            }),
            Animated.timing(unitRotaionValue, {
                toValue: 3,
                duration: ANIMATION_DURATION_SLOW,
                useNativeDriver: true,
            }),
        ]);

        animation.start();

        return () => {
            //unitRotaionValue.stopAnimation();
            animation.reset();
        };
    }, [unitRotaionValue]);

    return (
        <Animated.View
            style={[
                styles.circle,
                {
                    transform: [{ rotateY: interpolate }],
                },
            ]}>
            <Text style={styles.text}>₩</Text>
        </Animated.View>
    );
}

function useSpinningWonStyles(size: number) {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        circle: {
            backgroundColor: theme.color.specified.blue,
            width: deviceUI.moderateScale(size),
            height: deviceUI.moderateScale(size),
            borderRadius: deviceUI.moderateScale(size),
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            textAlign: "center",
            fontFamily: theme.font.fontFamily.pretendard.bold,
            fontSize: deviceUI.moderateScale(size * 0.5),
            color: theme.color.specified.white,
        },
    });
}

type SpinningWonProps = {
    size?: number;
};
