import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import { BuildingTenant } from "../../../../services/types";
import { MenuType } from "../../types";

export type TenantFilterProps = {
    type: MenuType;
    onFilterChange(tenants: BuildingTenant[]): void;
};

export type FilterDefaultProps = {
    messages: ReturnType<typeof useScreenMessage>["messages"];
    onChangeFilterCondition(menu: MenuType, conditions: string[]): void;
};

export type FilterConditions = {
    floor: string[] | null;
    contract: string[] | null;
    status: string[] | null;
    expiration: string[] | null;
};
