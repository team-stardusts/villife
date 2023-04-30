import { StyleSheet } from "react-native";

export default interface AuthScreenTitleViewProps {
    title: string;
    subtitles?: string[];
}

export type UseAuthScreenTitleViewStylesType = ReturnType<typeof StyleSheet.create>;
