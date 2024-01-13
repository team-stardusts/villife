import { Villife } from "@team-stardusts/villife-client";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";

import { SelectAllStatus, TenantLayoutViewProps } from "../types";
import useBuildingTenantMatrixViewStyles from "./styles";

export type BuildingTenantMatrixViewProps = TenantLayoutViewProps & {
    roomInfos: Villife.Contract.Room[];
};

export type BuildingTenantFloorViewProps = {
    roomInfos: Villife.Contract.Room[];
    messages: ReturnType<typeof useScreenMessage>["messages"];
    styles: ReturnType<typeof useBuildingTenantMatrixViewStyles>["floor"];
    targetCheckMode: boolean;
    selectAllStatus: SelectAllStatus;
    onCheck(props: OnBuildingTenantCheck): void;
};

export type BuildingTenantProps = {
    messages: ReturnType<typeof useScreenMessage>["messages"];
    styles: ReturnType<typeof useBuildingTenantMatrixViewStyles>["floor"];
    roomInfo: Villife.Contract.Room;
    targetCheckMode: boolean;
    selectAllStatus: SelectAllStatus;
    onCheck(props: OnBuildingTenantCheck): void;
};

export type OnBuildingTenantCheck = {
    isCheck: boolean;
    tenant: Villife.Contract.Room;
};
