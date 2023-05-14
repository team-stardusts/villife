import { useEffect, useState } from "react";
import { Keyboard, KeyboardEventName, Platform } from "react-native";
import { UseOnKeyboardEventParam } from "./type";

function useOnKeyboardEvent(props: UseOnKeyboardEventParam) {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const onKeyboardShow = (event: any) => {
            console.log(event.endCoordinates.height);
            setKeyboardHeight(event.endCoordinates.height);
            if (props.onShow) props.onShow();
        };
        const onKeyboardHide = () => {
            setKeyboardHeight(0);
            if (props.onHide) props.onHide();
        };

        const onShow = Platform.select({
            ios: "keyboardWillShow",
            android: "keyboardDidShow",
        }) as KeyboardEventName;
        const onHide = Platform.select({
            ios: "keyboardWillHide",
            android: "keyboardDidHide",
        }) as KeyboardEventName;

        console.log(onShow, onHide);

        Keyboard.addListener(onShow, onKeyboardShow);
        Keyboard.addListener(onHide, onKeyboardHide);

        return () => {
            Keyboard.removeAllListeners(onShow);
            Keyboard.removeAllListeners(onHide);
        };
    }, []);

    return keyboardHeight;
}

export default useOnKeyboardEvent;
