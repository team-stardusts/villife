import { GestureResponderEvent, StyleSheet } from "react-native";

export default interface ScreenBottonButtonProps {
    title: string;
    disabled?: boolean;
    onPress?(): void;
    //onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}
