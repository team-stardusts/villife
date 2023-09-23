import { Animated, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { ContentBoxProps } from "./types";
import useStyler from "../../hooks/styler/hooks";
import { useEffect, useRef } from "react";
import { ANIMATION_DURATION_DEFAULT } from "../../constants";

export default function ContentBox({ children, backgroundColor, enableShadow, onPress }: ContentBoxProps) {
    const { deviceUI, theme } = useStyler();
    const opacityValue = useRef(new Animated.Value(0)).current;
    const translateYValue = useRef(new Animated.Value(9)).current;
    const shadow = enableShadow
        ? Platform.select({
              ios: {
                  shadowColor: theme.color.specified.grey,
                  shadowOpacity: 0.2,
                  shadowRadius: deviceUI.moderateScale(3),
                  shadowOffset: {
                      height: 0,
                      width: 0,
                  },
              },
              android: {
                  shadowColor: theme.color.specified.grey,
                  elevation: 2,
              },
          })
        : {};

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityValue, {
                toValue: 1,
                duration: ANIMATION_DURATION_DEFAULT,
                useNativeDriver: true,
            }),
            Animated.timing(translateYValue, {
                toValue: 0,
                duration: ANIMATION_DURATION_DEFAULT,
                useNativeDriver: true,
            }),
        ]).start();
    }, [opacityValue, translateYValue]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        box: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: deviceUI.moderateScale(15),
            //marginBottom: deviceUI.moderateScale(15),
            backgroundColor: backgroundColor ?? theme.color.specified.blue,
            ...shadow,
        },
    });
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.6}
            disabled={onPress === undefined}
            onPress={() => onPress && onPress()}>
            <Animated.View
                style={[
                    styles.box,
                    {
                        opacity: opacityValue,
                        transform: [{ translateY: translateYValue }],
                    },
                ]}>
                {children !== undefined ? children : <></>}
            </Animated.View>
        </TouchableOpacity>
    );
}
