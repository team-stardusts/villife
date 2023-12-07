import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import { SelectAllStatus, TenantLayoutViewProps } from "../types";
import useBuildingTenantListViewStyles from "./styles";
import Villife from "../../../../../../libs/villife-client/types";

export type BuildingTenantListViewProps = TenantLayoutViewProps & {
    roomInfos: Villife.Contract.Room[];
};

export type BuildingTenantProps = {
    index: number;
    messages: ReturnType<typeof useScreenMessage>["messages"];
    styles: ReturnType<typeof useBuildingTenantListViewStyles>["tenant"];
    roomInfo: Villife.Contract.Room;
    targetCheckMode: boolean;
    selectAllStatus: SelectAllStatus;
    onCheck(isCheck: boolean, tenantIndex: number): void;
};
