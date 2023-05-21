import Toast from "react-native-toast-message";
import { ToastType } from "./type";
import { TOAST_DEFAULT_OFFSET, TOAST_DEFAULT_VISIBILITY_TIME } from "../../constants";

export default class VillifeToastMessage {
    static showBottomToast(type: ToastType, content: string) {
        Toast.show({
            type: type,
            text1: content,
            position: "bottom",
            visibilityTime: TOAST_DEFAULT_VISIBILITY_TIME,
            bottomOffset: TOAST_DEFAULT_OFFSET,
        });
    }
}
