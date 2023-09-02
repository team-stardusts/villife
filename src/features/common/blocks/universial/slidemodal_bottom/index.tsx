import React, { useEffect } from "react";
import { StyleSheet, Modal, Animated, PanResponder, Dimensions, View, Text } from "react-native";
import { Pressable } from "react-native";
import { BottomSlidableModalProps } from "./type";
import useStyler from "../../../hooks/styler/hooks";
import { ANIMATION_DURATION_FAST } from "../../../constants";

const BottomSlidableModal = (props: BottomSlidableModalProps) => {
    const screenSize = useStyler().deviceUI.getScreenSize();

    const conSize = props.height || screenSize.height * 0.35;
    const panY = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        panY.setValue(conSize * 0.99);
        Animated.timing(panY, {
            toValue: 0,
            duration: ANIMATION_DURATION_FAST,
            useNativeDriver: true,
        }).start();
    }, [props.modalVisible]);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => {
            return true;
        },
        onPanResponderGrant: () => {},
        onPanResponderMove: (e, gestureState) => {
            if (gestureState.dy > 0) {
                if (gestureState.dy < conSize * 0.99) panY.setValue(gestureState.dy);
            }
        },
        onPanResponderRelease: (e, gestureState) => {
            if (gestureState.dy > conSize * 0.4) {
                props.setModalVisible(false);
                panY.setValue(0);
            }
            Animated.spring(
                panY, // Auto-multiplexed
                { toValue: 0, useNativeDriver: true } // Back to zero
            ).start();
        },
    });

    return (
        <Modal
            animationType="fade"
            transparent
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(false);
            }}
            style={[{ width: screenSize.width, height: screenSize.height }, localStyle.wrapper]}>
            <NoAnimationModalComponent setModalVisible={props.setModalVisible} />
            <Animated.View
                {...panResponder.panHandlers}
                style={[localStyle.container, { height: conSize, transform: [{ translateY: panY }] }]}>
                <View style={localStyle.headerSection}>
                    <View style={localStyle.headerDeco}></View>
                </View>
                <View style={[localStyle.contentSection]}>{props.children}</View>
            </Animated.View>
        </Modal>
    );
};

export default BottomSlidableModal;

export const NoAnimationModalComponent = ({
    setModalVisible,
}: {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const screenSize = useStyler().deviceUI.getScreenSize();
    return (
        <View
            style={{
                position: "absolute",
                width: screenSize.width,
                height: screenSize.height,
                backgroundColor: "rgba(180,180,180,0.5)",
            }}>
            <Pressable
                style={{ flex: 1 }}
                onPress={() => {
                    setModalVisible(false);
                }}
            />
        </View>
    );
};

const localStyle = StyleSheet.create({
    wrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 7,
    },
    container: {
        backgroundColor: "white",
        overflow: "hidden",
        position: "absolute",
        bottom: 0, //"-10%",
        left: 0,
        width: "100%",
        zIndex: 3,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        shadowColor: "black",
        shadowOffset: {
            width: 12,
            height: 12,
        },
        shadowOpacity: 0.8,
        shadowRadius: 16.0,
        elevation: 24,
    },
    headerSection: {
        height: "10%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    headerDeco: {
        backgroundColor: "#d9d9d9",
        borderRadius: 5,
        width: "15%",
        height: 5,
    },
    contentSection: {
        height: "95%",
        width: "100%",
        alignItems: "flex-start",
    },
});
