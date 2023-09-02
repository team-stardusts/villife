import { BuildingRoomInfo } from "../../services/provider/types";
import { LayoutType } from "./blocks/layout_selector";

export type BuildingTenantFilterProps = {
    onLayoutChange(layout: LayoutType): void;
    onFilterChange(tenants: BuildingRoomInfo[]): void;
};

export type MenuType = "floor" | "contract" | "status" | "expiration";
