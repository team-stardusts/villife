import { ContentPriority } from "../box_label.tsx/type";

export type OutlinedBoxProps = {
    priority: ContentPriority;
    priorityName: string;
    title?: string;
    content?: string;
    wroteAt?: string;
};
