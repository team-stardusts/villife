import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import { BuildingRoomInfo } from "../../../../services/provider/types";
import { MenuType } from "../../types";

export type TenantFilterProps = {
    type: MenuType;
    onFilterChange(tenants: BuildingRoomInfo[]): void;
};

export type FilterDefaultProps = {
    messages: ReturnType<typeof useScreenMessage>["messages"];
    onChangeFilterCondition(menu: MenuType, conditions: (string | undefined)[]): void;
};

export type FilterConditions = {
    floor: string[] | null;
    contract: string[] | null;
    status: string[] | null;
    expiration: string[] | null;
};
