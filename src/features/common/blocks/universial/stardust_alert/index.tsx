import { Animated, Modal, View } from "react-native";
import { StardustAlertProps } from "./types";
import useStardustAlertStyles from "./styles";
import StardustAlertHeader from "./blocks/header";
import StardustAlertBody from "./blocks/body";
import StardustAlertBottom from "./blocks/bottom";
import { useEffect, useRef } from "react";
import { ANIMATION_DURATION_FAST_LV1 } from "../../../constants";

export default function StardustAlert(props: StardustAlertProps) {
    const styles = useStardustAlertStyles(props.message !== undefined);
    const scaleValue = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
        return () => {
            props.setAlert({
                ...props,
                visible: false,
            });
        };
    }, []);

    useEffect(() => {
        if (props.visible) {
            const animation = Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 1.05,
                    duration: ANIMATION_DURATION_FAST_LV1,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: ANIMATION_DURATION_FAST_LV1,
                    useNativeDriver: true,
                }),
            ]);

            animation.start();

            return () => {
                animation.reset();
            };
        }
    }, [scaleValue, props.visible]);

    return (
        <Modal
            style={styles.main.modal}
            visible={props.visible}
            animationType="fade"
            transparent
            onRequestClose={() =>
                props.setAlert({
                    ...props,
                    visible: false,
                })
            }>
            <View style={styles.main.bgwrapper} />
            <View style={styles.main.container}>
                <Animated.View
                    style={[
                        styles.main.alert,
                        {
                            transform: [
                                {
                                    scale: scaleValue,
                                },
                            ],
                        },
                    ]}>
                    <View style={styles.main.header}>
                        <StardustAlertHeader
                            type={props.type}
                            title={props.title}
                            enterMessage={props.message !== undefined}
                            styles={styles.header}
                        />
                    </View>
                    <View style={styles.main.body}>
                        <StardustAlertBody message={props.message ?? props.title} styles={styles.body} />
                    </View>
                    <View style={styles.main.bottom}>
                        <StardustAlertBottom {...props} styles={styles.bottom} />
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}
