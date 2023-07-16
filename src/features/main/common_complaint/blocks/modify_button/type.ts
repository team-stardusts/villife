import { GestureResponderEvent, StyleSheet } from "react-native";

export default interface NotiModifyButtonProps {
    loading: boolean;
    onSubmit(): () => void;
}

export type useNotiModifyButtonStylesType = ReturnType<typeof StyleSheet.create>;
