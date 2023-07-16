import { StyleSheet } from "react-native";

export default interface NotiRegisterButtonProps {
    loading: boolean;
    onSubmit(): () => void;
}

export type UseNotiRegisterButtonStylesType = ReturnType<typeof StyleSheet.create>;
