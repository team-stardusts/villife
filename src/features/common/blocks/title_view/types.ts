import { StyleSheet } from "react-native";

export default interface ScreenTitleViewProps {
    titles: string[];
    subtitles?: string[];
    children: React.ReactNode;
}
