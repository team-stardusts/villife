import { StyleSheet } from "react-native";

export default interface PermissionScreenViewProps {
    title: string;
    subtitle?: string;
}

export type UsePermissionScreenViewStylesType = ReturnType<typeof StyleSheet.create>;
