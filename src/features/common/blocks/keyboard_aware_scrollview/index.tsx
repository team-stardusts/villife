import { useRef, useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import useOnKeyboardEvent from "../../hooks/keyboard";
import useStyler from "../../hooks/styler/hooks";
import { KeyboardAwareScrollViewProps } from "./types";

export default function KeyboardAwareScrollView({
    style,
    children,
    touchedCoordinateY = 9999,
}: KeyboardAwareScrollViewProps) {
    const { deviceUI } = useStyler();

    const scollRef = useRef<ScrollView>(null);
    //const [scollHeight, setScollHeight] = useState<number>(0);
    //const [didMeasure, setDidMeasure] = useState<boolean>(false);

    useOnKeyboardEvent({
        onShow(keyboardHeight) {
            const safetyHeight: number = deviceUI.screenSize.height - keyboardHeight;

            if (safetyHeight < touchedCoordinateY) scollRef.current?.scrollToEnd({ animated: true });
            else scollRef.current?.scrollTo({ y: 0, animated: true });
        },
        onHide() {
            scollRef.current?.scrollTo({ y: 0, animated: true });
        },
    });

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        scrollview: {
            flex: 1,
        },
        childrenContainer: {
            flex: 1,
            width: "100%",
        },
    });

    return (
        <KeyboardAvoidingView style={[styles.container, style]} behavior="padding">
            <ScrollView ref={scollRef} style={styles.scrollview} showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView style={styles.childrenContainer} behavior="padding">
                    {children}
                </KeyboardAvoidingView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
