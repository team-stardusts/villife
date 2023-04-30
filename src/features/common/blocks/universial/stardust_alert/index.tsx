import React from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { StardustAlertProps } from "./type";

export default function StardustAlert(props: StardustAlertProps) {
    const screenSize = Dimensions.get("window");

    return (
        <Modal
            animationType="fade"
            transparent
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(!props.modalVisible);
            }}
            style={[{ width: screenSize.width, height: screenSize.height }, localStyle.wrapper]}>
            <View style={localStyle.container}>
                <View style={localStyle.content}>
                    <View style={[localStyle.textSection, { height: screenSize.height * 0.1 }]}>
                        <Text style={localStyle.mainText}>{props.mainText}</Text>
                    </View>
                    {props.image ? (
                        <View style={[localStyle.imageSection, { height: screenSize.height * 0.1 }]}>
                            <Image source={props.image} resizeMode="cover" />
                        </View>
                    ) : (
                        <></>
                    )}

                    <View style={[localStyle.buttonSection, { height: screenSize.height * 0.07, marginBottom: 20 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                if (props.leftOnPress) props.leftOnPress();
                            }}
                            style={localStyle.leftButton}>
                            <Text style={localStyle.leftButtonText}>{props.leftButtonText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (props.rightOnPress) props.rightOnPress();
                            }}
                            style={localStyle.rightButton}>
                            <Text style={localStyle.rightButtonText}> {props.rightButtonText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const localStyle = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.6)",
    },
    wrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
    },
    content: {
        width: "88%",
        backgroundColor: "white",
        flex: 0,
        borderRadius: 13,
        overflow: "hidden",
        elevation: 5, // Android only
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    textSection: {
        justifyContent: "center",
        alignItems: "center",
    },
    imageSection: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonSection: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    mainText: {
        color: "#191F26",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },
    leftButtonText: {
        color: "#191F26",
        fontSize: 14,
        fontWeight: "400",
    },
    rightButtonText: {
        color: "#F2F3F5",
        fontSize: 14,
        fontWeight: "400",
    },
    leftButton: {
        height: "80%",
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2F3F5",
        borderRadius: 8,
        marginRight: 2,
    },
    rightButton: {
        height: "80%",
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0B75F2",
        borderRadius: 8,
        marginLeft: 2,
    },
});
