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
import useSystemInfo from "../common/hooks/systeminfo/hooks";
import VillifeStorage from "../../libs/storage";
import NavigationView from "../common/blocks/navigation";
import TimePicker from "../common/atoms/time_picker";
import useStyler from "../common/hooks/styler/hooks";
import EtdaTimePicker from "../main/parking/blocks/etad_time_picker";
import UniversalTextInput from "../common/blocks/universial/textinput";
import { useEffect, useRef, useState } from "react";
import useOnKeyboardEvent from "../common/hooks/keyboard";

export default function TestScreen() {
    const firebaseToken = useGetFirebaseToken();
    const { deviceUI } = useStyler();

    const styles = StyleSheet.create({
        avoidingContainer: {
            flex: 1,
        },
        scrollview: {
            flex: 1,
            paddingBottom: 30,
            //backgroundColor: "lightgrey",
        },
        container: {
            flex: 1,
            width: "100%",
            //backgroundColor: "teal",
        },
        testButtonContainer: {
            flex: 1,
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
            flex: 9,
        },
    });
    const [isFold, setIsFold] = useState<boolean>(true);
    const scollRef = useRef<ScrollView>(null);
    const panResponder = useRef<PanResponder>(null).current;
    const [state, setState] = useState({ x: 0, y: 0 });
    const [pressedY, setPressedY] = useState<number>(0);
    const [DidMeasure, setDidMesure] = useState(false);
    const [scollHeight, setScrollHeight] = useState<{
        absolute: number;
        current: number;
    }>({
        absolute: 0,
        current: 0,
    });

    const keyboardH = useOnKeyboardEvent({
        onShow(keyboardHeight) {
            setIsFold(false);
            setScrollHeight({
                ...scollHeight,
                current: scollHeight.absolute - keyboardHeight,
            });
            const coordiY = deviceUI.screenSize.height - (pressedY + 30);
            console.log("offsetY", coordiY);

            let offsetY = 0;

            if (coordiY < keyboardHeight) offsetY = coordiY;

            scollRef.current?.scrollTo({ y: offsetY, animated: true });
            setPressedY(0);
        },
        onHide() {
            setIsFold(true);
            setScrollHeight({
                ...scollHeight,
                current: scollHeight.absolute,
            });
            scollRef.current?.scrollTo({ y: 0, animated: true });
        },
    });

    const scrollHV = useRef(new Animated.Value(scollHeight.absolute)).current;

    useEffect(() => {
        Animated.timing(scrollHV, {
            toValue: scollHeight.current,
            duration: 100,
            useNativeDriver: false,
        });
    }, [scollHeight]);

    /* useEffect(() => {
        if (panResponder !== undefined) {
            panResponder = PanResponder.create({
                onMoveShouldSetPanResponder: () => true,
                onPanResponderMove: (evt, gestureState) => {
                    const { moveX, moveY } = gestureState;
                    setState({ x: moveX, y: moveY });
                },
            });
        }
    }, []); */

    return (
        <NavigationView headerOptions={{ title: "TEST" }}>
            <TouchableWithoutFeedback
                onPress={(event) => {
                    console.log("X", event.nativeEvent.locationX);
                    console.log("Y", event.nativeEvent.locationY);
                }}>
                <KeyboardAvoidingView style={[styles.avoidingContainer]} behavior="padding">
                    <ScrollView
                        ref={scollRef}
                        style={[styles.scrollview]}
                        //keyboardShouldPersistTaps="handled"
                        onLayout={(event) => {
                            if (!DidMeasure) {
                                setDidMesure(true);
                                setScrollHeight({
                                    ...scollHeight,
                                    absolute: event.nativeEvent.layout.height,
                                    current: event.nativeEvent.layout.height,
                                });
                            }
                        }}>
                        <View
                            style={[styles.container, { height: scollHeight.absolute, marginBottom: isFold ? 0 : 30 }]}>
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
                                <UniversalTextInput />
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
                                <UniversalTextInput
                                    onTouchEnd={(event) => {
                                        setPressedY(event.nativeEvent.pageY);
                                    }}
                                />
                                <Text>e</Text>
                                <UniversalTextInput
                                    onTouchEnd={(event) => {
                                        setPressedY(event.nativeEvent.pageY);
                                    }}
                                />
                                <Text>e</Text>
                                <UniversalTextInput
                                    onTouchEnd={(event) => {
                                        setPressedY(event.nativeEvent.pageY);
                                    }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </NavigationView>
    );
}
