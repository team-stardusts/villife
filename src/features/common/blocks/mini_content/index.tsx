import { Animated, Text, TouchableOpacity, View } from "react-native";
import Icon from "../../atoms/icon";
import useStyler from "../../hooks/styler/hooks";
import { MiniContentProps } from "./types";
import useHomeScreenContentStyles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation, VILLIFE_ROOT_STACK_PARAMS } from "../../router/types";
import ContentBox from "../content_box";
import { useEffect, useRef } from "react";
import { ANIMATION_DURATION_SLOW } from "../../constants";

export default function MiniContent({ title, navigation, children, backgroundColor }: MiniContentProps) {
    const { deviceUI, theme } = useStyler();
    const styles = useHomeScreenContentStyles();
    const nav = useNavigation<VillifeNavigation>();

    const opacityValue = useRef(new Animated.Value(0)).current;
    const translateYValue = useRef(new Animated.Value(10)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityValue, {
                toValue: 1,
                duration: ANIMATION_DURATION_SLOW,
                useNativeDriver: true,
            }),
            Animated.timing(translateYValue, {
                toValue: 0,
                duration: ANIMATION_DURATION_SLOW,
                useNativeDriver: true,
            }),
        ]).start();
    }, [opacityValue, translateYValue]);

    const navigate = () => {
        if (navigation !== undefined) {
            const finded = VILLIFE_ROOT_STACK_PARAMS.find((value) => value === navigation.to);

            if (finded !== undefined) {
                nav.reset({
                    index: 0,
                    routes: [{ name: navigation.to, params: navigation.params }],
                });
            } else {
                nav.push(navigation.to, navigation.params);
            }
        }
    };

    return (
        <View style={styles.toplevelBox}>
            <TouchableOpacity
                style={styles.navigationBox}
                onPress={() => navigate()}
                disabled={navigation === undefined}>
                <Animated.View
                    style={[
                        styles.navigationWrapper,
                        {
                            opacity: opacityValue,
                            transform: [{ translateY: translateYValue }],
                        },
                    ]}>
                    <Text style={styles.navigationTitle}>{title}</Text>
                    {navigation && (
                        <Icon name="arrow-right" size={deviceUI.moderateScale(40)} color={theme.colorFamily.grey} />
                    )}
                </Animated.View>
            </TouchableOpacity>
            <View style={styles.contentWrapper}>
                <ContentBox backgroundColor={backgroundColor}>{children}</ContentBox>
            </View>
        </View>
    );
}
