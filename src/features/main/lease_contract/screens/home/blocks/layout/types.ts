export type LayoutSelectorProps = {
    layout: LayoutType;
    onSelect(type: LayoutType): void;
};

export type LayoutType = "list" | "matrix";
