import { ColorValue } from "react-native";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import { BuildingTenant } from "../../../services/types";
import { SelectAllStatus, TenantLayoutViewProps } from "../types";
import useBuildingTenantListViewStyles from "./styles";

export type BuildingTenantListViewProps = TenantLayoutViewProps & {
    tenants: BuildingTenant[];
};

export type BuildingTenantProps = {
    index: number;
    messages: ReturnType<typeof useScreenMessage>["messages"];
    styles: ReturnType<typeof useBuildingTenantListViewStyles>["tenant"];
    tenant: BuildingTenant;
    targetCheckMode: boolean;
    selectAllStatus: SelectAllStatus;
    onCheck(isCheck: boolean, tenantIndex: number): void;
};
