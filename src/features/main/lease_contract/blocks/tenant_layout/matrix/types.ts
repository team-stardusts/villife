import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import { BuildingRoomInfo } from "../../../services/building_rooms/provider/types";
import { SelectAllStatus, TenantLayoutViewProps } from "../types";
import useBuildingTenantMatrixViewStyles from "./styles";

export type BuildingTenantMatrixViewProps = TenantLayoutViewProps & {
    tenants: BuildingRoomInfo[];
};

export type BuildingTenantFloorViewProps = {
    tenants: BuildingRoomInfo[];
    messages: ReturnType<typeof useScreenMessage>["messages"];
    styles: ReturnType<typeof useBuildingTenantMatrixViewStyles>["floor"];
    targetCheckMode: boolean;
    selectAllStatus: SelectAllStatus;
    onCheck(props: OnBuildingTenantCheck): void;
};

export type BuildingTenantProps = {
    messages: ReturnType<typeof useScreenMessage>["messages"];
    styles: ReturnType<typeof useBuildingTenantMatrixViewStyles>["floor"];
    roomInfo: BuildingRoomInfo;
    targetCheckMode: boolean;
    selectAllStatus: SelectAllStatus;
    onCheck(props: OnBuildingTenantCheck): void;
};

export type OnBuildingTenantCheck = {
    isCheck: boolean;
    tenant: BuildingRoomInfo;
};
