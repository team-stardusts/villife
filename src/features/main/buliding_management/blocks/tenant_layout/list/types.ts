import { BuildingTenant } from "../../../services/types";
import { TenantLayoutViewProps } from "../types";

export type BuildingTenantListViewProps = TenantLayoutViewProps & {
    tenants: BuildingTenant[];
};
