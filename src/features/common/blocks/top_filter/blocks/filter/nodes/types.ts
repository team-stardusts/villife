import useScreenMessage from "../../../../../hooks/multilingual/hooks";
import useFilterStyles from "../styles";

export type HorizontalFilterProps = {
    headers: string[];
    postfix?: string;
    enableSelectAll?: boolean;
    disableMultipleSelection: boolean;
    onChangeSelectedItems(headers: string[]): void;
    styles: ReturnType<typeof useFilterStyles>["nodes"];
};

export type NodeProps = {
    isSelected: boolean;
    index: number;
    item: string;
    postfix?: string;
    messages: ReturnType<typeof useScreenMessage>["messages"]["words"];
    styles: ReturnType<typeof useFilterStyles>["nodes"];
    onPress(): void;
};
