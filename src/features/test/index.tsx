import {
    Animated,
    KeyboardAvoidingView,
    PanResponder,
    PanResponderInstance,
    ScrollView,
    StyleSheet,
    Text,
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
        avoidingContainer: {
            flex: 1,
        },
        scrollview: {
            flex: 1,
            //backgroundColor: "lightgrey",
        },
        container: {
            flex: 1,
            width: "100%",
            //backgroundColor: "teal",
        },
        testButtonContainer: {
            //flex: 1,
        },
        testButton: {
            width: "100%",
            backgroundColor: "red",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
        },
        buttonText: {
            fontSize: 20,
        },
        timepickerContainer: {
            flex: 4,
        },
        timepickerWrapper: {
            width: "100%",
        },
        inputsContainer: {
            //flex: 9,
        },
    });

    const [touchedCoordinateY, setTouchedCoordinateY] = useState<number>(0);

    return (
        <NavigationView headerOptions={{ title: "TEST" }}>
            <KeyboardAwareScrollView enableOnAndroid={true} /* touchedCoordinateY={touchedCoordinateY} */>
                <View style={styles.testButtonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log(firebaseToken);
                        }}
                        style={styles.testButton}>
                        <Text style={styles.buttonText}>버튼</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputsContainer}>
                    <Text>a</Text>
                    <UniversalTextInput
                        onTouchEndCapture={(event) => {
                            setTouchedCoordinateY(event.nativeEvent.pageY);
                        }}
                    />
                    <Text>b</Text>
                    <UniversalTextInput />
                    <Text>c</Text>
                    <UniversalTextInput />
                    <Text>d</Text>
                    <UniversalTextInput />
                    <Text>e</Text>
                    <UniversalTextInput />
                    <Text>e</Text>
                    <UniversalTextInput />
                    <Text>e</Text>
                    <UniversalTextInput />
                    <Text>e</Text>
                    <UniversalTextInput />
                    <Text>e</Text>
                    <UniversalTextInput />
                    <Text>x</Text>
                    <UniversalTextInput
                        onTouchEndCapture={(event) => {
                            setTouchedCoordinateY(event.nativeEvent.pageY);
                        }}
                    />
                    <Text>y</Text>
                    <UniversalTextInput
                        onTouchEndCapture={(event) => {
                            setTouchedCoordinateY(event.nativeEvent.pageY);
                        }}
                    />
                    <Text>z</Text>
                    <UniversalTextInput
                        onTouchEndCapture={(event) => {
                            setTouchedCoordinateY(event.nativeEvent.pageY);
                        }}
                    />
                </View>
            </KeyboardAwareScrollView>
        </NavigationView>
    );
}
