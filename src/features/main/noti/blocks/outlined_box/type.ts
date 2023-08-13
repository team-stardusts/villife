import { FlatList } from "react-native";
import { ContentPriority } from "../noti_label.tsx/type";
import { Notice } from "../../../../../libs/rest_apis/villife/notice/types";

export type OutlinedBoxProps = {
    id: number;
    priority: ContentPriority;
    title: string;
    content: string;
    wroteAt: string;
    position: number;
    flatListRef: React.RefObject<FlatList<Notice>>;
};
