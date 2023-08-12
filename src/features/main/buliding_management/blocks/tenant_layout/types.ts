import { BuildingTenant } from "../../services/types";
import { LayoutType } from "../filter/blocks/layout_selector";

export type TentantLayoutProps = TentantLayoutDefaultProps & {
    tenants: BuildingTenant[];
    layout: LayoutType;
    checkmode: boolean;
    onCheckTarget?(tenants: BuildingTenant[]): void;
};

export type TenantLayoutViewProps = TentantLayoutDefaultProps & {
    selectAllStatus: SelectAllStatus;
    onCheckTarget(tenantsIndex: number[]): void;
};

export type TentantLayoutDefaultProps = {
    tenants: BuildingTenant[];
    layout: LayoutType;
    checkmode: boolean;
};

export type SelectAllStatus = "select_all" | "unselect_all" | "unselect_element";

/*
1. 전체 선택
    - Press btn
    - 상태
*/
