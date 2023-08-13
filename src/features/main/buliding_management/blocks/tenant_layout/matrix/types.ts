import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import { BuildingTenant } from "../../../services/types";
import { SelectAllStatus, TenantLayoutViewProps } from "../types";
import useBuildingTenantMatrixViewStyles from "./styles";

export type BuildingTenantMatrixViewProps = TenantLayoutViewProps & {
    tenants: BuildingTenant[];
};

export type BuildingTenantFloorViewProps = {
    tenants: BuildingTenant[];
    messages: ReturnType<typeof useScreenMessage>["messages"];
    styles: ReturnType<typeof useBuildingTenantMatrixViewStyles>["floor"];
    targetCheckMode: boolean;
    selectAllStatus: SelectAllStatus;
    onCheck(props: OnBuildingTenantCheck): void;
};

export type BuildingTenantProps = {
    messages: ReturnType<typeof useScreenMessage>["messages"];
    styles: ReturnType<typeof useBuildingTenantMatrixViewStyles>["floor"];
    tenant: BuildingTenant;
    targetCheckMode: boolean;
    selectAllStatus: SelectAllStatus;
    onCheck(props: OnBuildingTenantCheck): void;
};

export type OnBuildingTenantCheck = {
    isCheck: boolean;
    tenant: BuildingTenant;
};
