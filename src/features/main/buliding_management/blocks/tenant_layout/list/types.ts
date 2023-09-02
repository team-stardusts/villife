import { ColorValue } from "react-native";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import { SelectAllStatus, TenantLayoutViewProps } from "../types";
import useBuildingTenantListViewStyles from "./styles";
import { BuildingRoomInfo } from "../../../services/provider/types";

export type BuildingTenantListViewProps = TenantLayoutViewProps & {
    tenants: BuildingRoomInfo[];
};

export type BuildingTenantProps = {
    index: number;
    messages: ReturnType<typeof useScreenMessage>["messages"];
    styles: ReturnType<typeof useBuildingTenantListViewStyles>["tenant"];
    tenant: BuildingRoomInfo;
    targetCheckMode: boolean;
    selectAllStatus: SelectAllStatus;
    onCheck(isCheck: boolean, tenantIndex: number): void;
};
