import Villife from "../../../../../libs/villife-client/types";
import { LayoutType } from "../../screens/home/blocks/layout/types";

export type TentantLayoutProps = TentantLayoutDefaultProps & {
    roomInfos: Villife.Contract.Room[];
    layout: LayoutType;
    checkmode: boolean;
    onCheckTarget?(tenants: Villife.Contract.Room[]): void;
};

export type TenantLayoutViewProps = TentantLayoutDefaultProps & {
    selectAllStatus: SelectAllStatus;
    onCheckTarget(tenantsIndex: number[]): void;
};

export type TentantLayoutDefaultProps = {
    roomInfos: Villife.Contract.Room[];
    layout: LayoutType;
    checkmode: boolean;
};

export type SelectAllStatus = "select_all" | "unselect_all" | "unselect_element";

/*
1. 전체 선택
    - Press btn
    - 상태
*/
