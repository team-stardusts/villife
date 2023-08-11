import { BuildingTenant } from "../../services/types";
import { LayoutType } from "../filter/blocks/layout_selector";

export type TentantLayoutProps = TentantLayoutDefaultProps & {
    tenants: BuildingTenant[];
    layout: LayoutType;
    checkmode: boolean;
    onCheckTarget?(tenants: BuildingTenant[]): void;
};

export type TenantLayoutViewProps = TentantLayoutDefaultProps & {
    isSelectAll: boolean;
    onCheckTarget(tenantsIndex: number[]): void;
};

export type TentantLayoutDefaultProps = {
    tenants: BuildingTenant[];
    layout: LayoutType;
    checkmode: boolean;
};
