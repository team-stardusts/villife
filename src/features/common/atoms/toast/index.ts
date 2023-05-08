import Toast from "react-native-toast-message";
import { ToastType } from "./type";

export default class VillifeToastMessage {
    static showBottomToast(type: ToastType, content: string) {
        Toast.show({
            type: type,
            text1: content,
            position: "bottom",
            visibilityTime: 1500,
            bottomOffset: 200,
        });
    }
}
