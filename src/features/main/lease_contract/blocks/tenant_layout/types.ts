import { LayoutType } from "../../screens/home/blocks/layout/types";
import { BuildingRoomInfo } from "../../services/building_rooms/provider/types";

export type TentantLayoutProps = TentantLayoutDefaultProps & {
    roomInfos: BuildingRoomInfo[];
    layout: LayoutType;
    checkmode: boolean;
    onCheckTarget?(tenants: BuildingRoomInfo[]): void;
};

export type TenantLayoutViewProps = TentantLayoutDefaultProps & {
    selectAllStatus: SelectAllStatus;
    onCheckTarget(tenantsIndex: number[]): void;
};

export type TentantLayoutDefaultProps = {
    roomInfos: BuildingRoomInfo[];
    layout: LayoutType;
    checkmode: boolean;
};

export type SelectAllStatus = "select_all" | "unselect_all" | "unselect_element";

/*
1. 전체 선택
    - Press btn
    - 상태
*/
