import {
    Animated,
    KeyboardAvoidingView,
    PanResponder,
    PanResponderInstance,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    UIManager,
    View,
} from "react-native";
import { useGetFirebaseToken } from "../common/hooks/firebase";
import NavigationView from "../common/blocks/navigation";
import useStyler from "../common/hooks/styler/hooks";
import UniversalTextInput from "../common/blocks/universial/textinput";
import { useEffect, useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//import KeyboardAwareScrollView from "../common/blocks/keyboard_aware_scrollview";

export default function TestScreen() {
    const firebaseToken = useGetFirebaseToken();
    const { deviceUI } = useStyler();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        btn: {
            height: "10%",
            backgroundColor: "teal",
            justifyContent: "center",
            alignItems: "center",
        },
    });

    const handleBtn = () => {
        const a = VillifeAlert("test", "test", () => console.log("sadfsadf"));

        a();
    };

    return (
        <NavigationView headerOptions={{ title: "TEST" }}>
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.btn}
                    activeOpacity={0.3}
                    underlayColor={"teal"}
                    onPress={VillifeAlert("test", "test", () => console.log("sadfsadf"))}>
                    <Text>Button</Text>
                </TouchableHighlight>
            </View>
        </NavigationView>
    );
}

function VillifeAlert(title: string, message: string, onPressConfirm?: () => void) {
    const al = (
        <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.messageText}>{message}</Text>
                <TouchableOpacity style={styles.confirmButton} onPress={onPressConfirm}>
                    <Text style={styles.confirmButtonText}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    return () => {
        return al;
    };
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#0080ff",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    innerContainer: {
        width: 250,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 15,
        alignItems: "center",
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10,
    },
    messageText: {
        fontSize: 14,
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: "#0080ff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    confirmButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});
