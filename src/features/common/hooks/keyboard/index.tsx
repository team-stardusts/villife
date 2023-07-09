import { useEffect, useState } from "react";
import { Keyboard, KeyboardEventName, Platform } from "react-native";
import { UseOnKeyboardEventParam } from "./type";

function useOnKeyboardEvent(props?: UseOnKeyboardEventParam) {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [isFold, setIsFold] = useState<boolean>(true);

    useEffect(() => {
        if (isFold) {
            props?.onHide && props.onHide(keyboardHeight);
        } else props?.onShow && props.onShow(keyboardHeight);
    }, [isFold]);

    useEffect(() => {
        const onKeyboardShow = (event: any) => {
            //console.log(event.endCoordinates.height);
            setKeyboardHeight(event.endCoordinates.height);
            setIsFold(false);
        };
        const onKeyboardHide = () => {
            setKeyboardHeight(0);
            setIsFold(true);
        };

        const onShow = Platform.select({
            ios: "keyboardWillShow",
            android: "keyboardDidShow",
        }) as KeyboardEventName;
        const onHide = Platform.select({
            ios: "keyboardWillHide",
            android: "keyboardDidHide",
        }) as KeyboardEventName;

        //console.log(onShow, onHide);

        Keyboard.addListener(onShow, onKeyboardShow);
        Keyboard.addListener(onHide, onKeyboardHide);

        return () => {
            try {
                Keyboard.removeAllListeners(onShow);
                Keyboard.removeAllListeners(onHide);
            } catch (e) {
                console.log("[useOnKeyboardEvent]", e);
            }
        };
    }, []);

    return keyboardHeight;
}

export default useOnKeyboardEvent;
