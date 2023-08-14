import { BuildingTenant } from "../../services/types";
import { LayoutType } from "./blocks/layout_selector";

export type BuildingTenantFilterProps = {
    onLayoutChange(layout: LayoutType): void;
    onFilterChange(tenants: BuildingTenant[]): void;
};

export type MenuType = "floor" | "contract" | "status" | "expiration";
