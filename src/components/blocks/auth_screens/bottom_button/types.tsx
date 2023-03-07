import { StyleSheet } from "react-native";

export default interface AuthScreenBottonButtonProps {
    title: string,
    disabled?: boolean | null;
}

export type UseAuthScreenBottonButtonStylesType = ReturnType<typeof StyleSheet.create>;