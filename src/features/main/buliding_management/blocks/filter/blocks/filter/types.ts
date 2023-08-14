import { BuildingTenant } from "../../../../services/types";
import { MenuType } from "../../types";

export type TenantFilterProps = {
    type: MenuType;
    onFilterChange(tenants: BuildingTenant[]): void;
};
