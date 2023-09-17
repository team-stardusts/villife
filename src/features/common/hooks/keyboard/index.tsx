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

        const onShowListenr = Keyboard.addListener(onShow, onKeyboardShow);
        const onHideListenr = Keyboard.addListener(onHide, onKeyboardHide);

        return () => {
            try {
                // Keyboard가 NativeModule을 가지고 있지만, KeyboardStatic에는 타입 선언이 되어 있지 않아
                // removeListeners를 사용할 수 없음
                // removeAllListers는 없는 Function.
                // 따라서, addListenr의 반환 객체를 통해 삭제함
                // 아래는 에러 유발 코드
                //Keyboard.removeAllListeners(onShow);
                //Keyboard.removeAllListeners(onHide);
                onShowListenr.remove();
                onHideListenr.remove();
            } catch (e) {
                console.log("[useOnKeyboardEvent]", e);
            }
        };
    }, []);

    return keyboardHeight;
}

export default useOnKeyboardEvent;
