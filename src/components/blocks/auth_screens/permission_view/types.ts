import { StyleSheet } from "react-native";

export default interface PermissionScreenViewProps {
    title: string;
    subtitle: string;
    providerName: string;
    diameter: number;
}

export type UsePermissionScreenViewStylesType = ReturnType<typeof StyleSheet.create>;
