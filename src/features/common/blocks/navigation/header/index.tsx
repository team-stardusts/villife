import { useEffect, useMemo, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../router/types";
import Icon from "../../../atoms/icon";
import useNavigationViewHeaderStyles from "./styles";
import { NavigationViewHeaderProps } from "./types";
import BuildingSelector from "./building_selector";
import { ANIMATION_DURATION_FAST_LV3 } from "../../../constants";
import useStyler from "../../../hooks/styler/hooks";

export default function NavigationViewHeader(props: NavigationViewHeaderProps) {
    const navigation = useNavigation<VillifeNavigation>();
    const translateXValue = useRef(new Animated.Value(0)).current;
    const { deviceUI } = useStyler();
    const TRANSLATE_X_STD_VALUE = deviceUI.moderateScale(40);

    const crrNavIndex = useMemo<number>(() => {
        const state = navigation.getState();

        if (state.index === 0) {
            translateXValue.setValue(-TRANSLATE_X_STD_VALUE);
        } else {
            translateXValue.setValue(TRANSLATE_X_STD_VALUE);
        }

        return state.index;
    }, [navigation]);

    const styles = useNavigationViewHeaderStyles(crrNavIndex);
    const backgroundColor = props?.style?.backgroundColor ?? styles.container.backgroundColor;
    const borderBottomColor = props?.style?.borderBottomColor ?? styles.container.borderBottomColor;

    useEffect(() => {
        Animated.timing(translateXValue, {
            toValue: 0,
            duration: ANIMATION_DURATION_FAST_LV3,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: backgroundColor,
                    borderBottomColor: borderBottomColor,
                    transform: [{ translateX: translateXValue }],
                },
            ]}>
            <View style={styles.box}>
                <TouchableOpacity
                    style={styles.wrapper}
                    disabled={crrNavIndex === 0}
                    onPress={() => navigation.canGoBack() && navigation.goBack()}>
                    {crrNavIndex > 0 && (
                        <View style={styles.iconBox}>
                            <Icon name="arrow-left" size={styles.icon.width} color={styles.icon.color} />
                        </View>
                    )}
                    <View style={styles.titleBox}>
                        <Text
                            style={styles.title}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            //minimumFontScale={0.2}
                            //maxFontSizeMultiplier={1}
                            adjustsFontSizeToFit>
                            {props.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.centerReactFuncBox}>{!props.hideBuidingSelector && <BuildingSelector />}</View>
            <View style={styles.rightReactFuncBox}>
                {props.navComponent !== undefined && <props.navComponent {...props.navComponentProps} />}
            </View>
        </Animated.View>
    );
}
