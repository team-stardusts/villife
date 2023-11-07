import { StyleSheet } from "react-native";

export default interface SendButtonProps {
    loading: boolean;
    onSubmit(): () => void;
}

export type UseSendButtonStylesType = ReturnType<typeof StyleSheet.create>;
