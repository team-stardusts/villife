import type useBuildingTenantFilterStyles from "../../styles";

export type LayoutSelectorProps = {
    layout: LayoutType;
    styles: ReturnType<typeof useBuildingTenantFilterStyles>["main"];
    onSelect(type: LayoutType): void;
};

export type LayoutType = "list" | "matrix";
