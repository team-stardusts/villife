import useFilterStyles from "../styles";

export type HorizontalFilterProps = {
    headers: string[];
    postfix?: string;
    enableSelectAll?: boolean;
    onChangeSelectedItems(headers: string[]): void;
    styles: ReturnType<typeof useFilterStyles>["nodes"];
};
