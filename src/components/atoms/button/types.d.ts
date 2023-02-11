import { PressableProps, StyleProp, TextStyle, ViewStyle } from "react-native/types";

export declare interface UniversalButtonProps {
    title: string;
    pressedBgColor?: string;
    bgColor?: string;
    titleStyle: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}