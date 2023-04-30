import { ContentPriority } from "../box_label.tsx/type";

export type OutlinedBoxProps = {
    id: number;
    priority: ContentPriority;
    title: string;
    content: string;
    wroteAt: string;
};
