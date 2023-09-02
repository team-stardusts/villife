import type { VerifyBuildingAddressResult } from "../../../../../libs/rest_apis/villife/approval/types";
import type { Building } from "../../../../../libs/rest_apis/villife/building/types";
import { SelectedAddressType } from "../../../../common/hooks/states/atoms/address/selected_address/types";

export interface IBuildingManagementServiceProvider
    extends IRoomInfosOnBuildingGetable,
        IBuildingVerifiable,
        IBuildingRegistable {}

interface IRoomInfosOnBuildingGetable {
    //getTentantsFromServer(buildingID: number): Promise<Building.Tenant[]>;
    getRoomInfos(buildingID: number): Promise<BuildingRoomInfo[]>;
}

interface IBuildingVerifiable {
    verifyBuildingAddress(params: VerifyBuildingAddress.Params): Promise<VerifyBuildingAddress.Returns>;
}

interface IBuildingRegistable {
    registerBuilding(params: RegisterBuilding.Params): Promise<RegisterBuilding.Returns>;
}

export namespace RegisterBuilding {
    export type Params = {
        basementInfo: number | null;
        buildingName: string;
        ownerName: string;
        roadAddress: string;
        roomsInfo: number[];
    };

    export type Returns = {
        buildingID: number;
        roadAddress: string;
    } | null;
}

export namespace VerifyBuildingAddress {
    export type Params = SelectedAddressType;
    export type Returns = {
        id: VerifyBuildingAddressResult["building_id"];
        name: VerifyBuildingAddressResult["building_name"];
    } | null;
}

export type BuildingRoomInfo = {
    contractInfo?: BuildingRoomContract;
    contractState: Building.RoomInfo["contract_state"];
    floor: number;
    residentName?: string;
    residentPhoneNumber?: string;
    roomNumber: number;
    roomID?: number;
    roomState: Building.RoomInfo["room_state"];
};

export type BuildingRoomContract = {
    contractID: Building.Contract["contract_id"];
    deposit: number;
    expirationDate: Date;
    managementFee: number;
    monthlyRent: number;
    rentType: Building.Contract["rent_type"];
    startDate: Date;
    //createdAt: Date;
    //updatedAt: Date;
};
