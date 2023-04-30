import { PressableProps, GestureResponderEvent, StyleProp, TextStyle } from "react-native/types";

export default interface ButtonProps extends PressableProps {
    title: string;
    titleStyle?: StyleProp<TextStyle>;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}
