import type useBuildingTenantFilterStyles from "../../styles";
import { MenuType } from "../../types";

export type MenuProps = {
    styles: ReturnType<typeof useBuildingTenantFilterStyles>["main"];
    type: MenuType;
    isSelected: boolean;
    onMenuPress(type: MenuType): void;
};
