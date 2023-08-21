import React from "react";
import { Modal, View, Text, TouchableOpacity, Image, Dimensions, Pressable, ColorValue } from "react-native";
import { StardustModalProps } from "./types";
import useStardustModalStyles from "./styles";
import Icon from "../../../atoms/icon";

type ButtonColor = {
    backgroundColor: ColorValue;
    color: ColorValue;
};

export default function StardustModal(props: StardustModalProps) {
    const { styles, theme } = useStardustModalStyles();

    if (props.buttons.length > 3) {
        console.error("[StartdustModal]", "he maximum number of buttons is 3.");
    }

    const setButtonColor = (index: number): ButtonColor => {
        const btns = props.buttons.length;
        const witchBtn = index + 1;
        const btnColor: ButtonColor = {
            backgroundColor: "",
            color: "",
        };

        if (witchBtn === btns) {
            btnColor.backgroundColor = theme.color.status.primary;
            btnColor.color = theme.color.specified.white;
        } else if (witchBtn === 1) {
            btnColor.backgroundColor = theme.color.series.grey.level1;
            btnColor.color = theme.color.specified.black;
        } else {
            btnColor.backgroundColor = theme.color.status.info;
            btnColor.color = theme.color.specified.white;
        }

        return btnColor;
    };

    return (
        <Modal
            animationType="fade"
            transparent
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(!props.modalVisible);
            }}
            style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.textSection}>
                        <View style={styles.titleBox}>
                            {props?.upperRightFunc && (
                                <TouchableOpacity
                                    style={styles.upperRightFuncBox}
                                    activeOpacity={0.6}
                                    onPress={() => props.upperRightFunc?.onPress && props.upperRightFunc.onPress()}>
                                    <Icon
                                        name={props.upperRightFunc.icon}
                                        size={styles.upperRightIcon.width}
                                        color={props.upperRightFunc.color ?? styles.upperRightIcon.color}
                                    />
                                </TouchableOpacity>
                            )}
                            <Text style={styles.title}>{props.title}</Text>
                        </View>
                        {props.subtitle && (
                            <View style={styles.titleBox}>
                                <Text style={styles.subtitle}>{props.subtitle}</Text>
                            </View>
                        )}
                    </View>
                    {props.image ? (
                        <View style={styles.imageSection}>
                            <Image source={props.image} resizeMode="cover" />
                        </View>
                    ) : (
                        <></>
                    )}
                    {props.children && <View style={styles.childrenSection}>{props.children}</View>}
                    <View style={styles.buttonSection}>
                        {props.buttons.map((button, index) => {
                            const btnColor = setButtonColor(index);
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.button,
                                        {
                                            backgroundColor: button.color ?? btnColor.backgroundColor,
                                            opacity: button.disabled ? 0.6 : 1,
                                        },
                                    ]}
                                    activeOpacity={0.6}
                                    onPress={() => button.onPress && button.onPress()}
                                    disabled={button.disabled}>
                                    <Text style={[styles.buttonText, { color: button.textColor ?? btnColor.color }]}>
                                        {button.text}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
                <Pressable
                    style={styles.wrapper}
                    onPress={() =>
                        props.onPressVoidSpace !== undefined ? props.onPressVoidSpace() : props.setModalVisible(false)
                    }
                />
            </View>
        </Modal>
    );
}
