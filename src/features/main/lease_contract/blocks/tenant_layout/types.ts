import { BuildingRoomInfo } from "../../services/building_rooms/provider/types";
import { LayoutType } from "../filter/blocks/layout";

export type TentantLayoutProps = TentantLayoutDefaultProps & {
    tenants: BuildingRoomInfo[];
    layout: LayoutType;
    checkmode: boolean;
    onCheckTarget?(tenants: BuildingRoomInfo[]): void;
};

export type TenantLayoutViewProps = TentantLayoutDefaultProps & {
    selectAllStatus: SelectAllStatus;
    onCheckTarget(tenantsIndex: number[]): void;
};

export type TentantLayoutDefaultProps = {
    tenants: BuildingRoomInfo[];
    layout: LayoutType;
    checkmode: boolean;
};

export type SelectAllStatus = "select_all" | "unselect_all" | "unselect_element";

/*
1. 전체 선택
    - Press btn
    - 상태
*/
