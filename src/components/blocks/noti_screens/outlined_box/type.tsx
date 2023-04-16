import { ContentPriority } from "../box_label.tsx/type";

export type OutlinedBoxProps = {
    priority: ContentPriority;
    title: string;
    content: string;
    wroteAt: string;
};
