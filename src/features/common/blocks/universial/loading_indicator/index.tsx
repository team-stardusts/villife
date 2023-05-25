import React, { Children } from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ActivityIndicator } from "react-native";
import useStyler from "../../../hooks/styler/hooks";
import { LoadingIndicatorProps } from "./type";

export default function StardustAlert(props: LoadingIndicatorProps) {
    const screenSize = Dimensions.get("window");
    const styles = useStyles();

    return (
        <Modal
            animationType="fade"
            transparent
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(!props.modalVisible);
            }}
            style={[{ width: screenSize.width, height: screenSize.height }, styles.wrapper]}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={[styles.textSection, { height: screenSize.height * 0.1 }]}>
                        <Text style={styles.title}>{props.title}</Text>
                        {props.subtitle && <Text style={styles.subtitle}>{props.subtitle}</Text>}
                    </View>
                    <View style={styles.loadingIndicatorSection}>
                        <ActivityIndicator size={"large"} />
                    </View>
                </View>
                <View style={styles.wrapper} />
            </View>
        </Modal>
    );
}

function useStyles() {
    const { deviceUI, theme } = useStyler();

    return StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            //backgroundColor: "rgba(255,255,255,0.6)",
        },
        wrapper: {
            position: "absolute",
            top: 0,
            left: 0,
            height: deviceUI.screenSize.height,
            width: deviceUI.screenSize.width,
            backgroundColor: theme.colorFamily.lightgrey,
            opacity: 0.6,
            zIndex: -1,
        },
        content: {
            width: "88%",
            backgroundColor: "white",
            flex: 0,
            borderRadius: deviceUI.moderateScale(15),
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
        childrenSection: {
            justifyContent: "center",
            alignItems: "center",
        },
        buttonSection: {
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
        },
        title: {
            color: theme.colorFamily.black,
            textAlign: "center",
            ...theme.font.researved.h3,
        },
        subtitle: {
            marginTop: deviceUI.moderateScale(5),
            color: theme.colorFamily.grey,
            textAlign: "center",
            ...theme.font.researved.h5,
        },
        loadingIndicatorSection: {
            justifyContent: "center",
            alignItems: "center",
        },
    });
}
