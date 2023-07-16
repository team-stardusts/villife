import { StyleSheet } from "react-native";
import { ContentPriority } from "../noti_label.tsx/type";

export type OutlinedBoxProps = {
    priority: ContentPriority;
    priorityName: string;
    title?: string;
    content?: string;
    wroteAt?: string;
};

export type UseNotiOutLinedBoxListStylesType = ReturnType<typeof StyleSheet.create>;
