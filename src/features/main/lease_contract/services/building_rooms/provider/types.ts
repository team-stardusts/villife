import type { VerifyBuildingAddressResult } from "../../../../../../libs/rest_apis/villife/approval/types";
import type { Building } from "../../../../../../libs/rest_apis/villife/building/types";
import { SelectedAddressType } from "../../../../../common/hooks/states/atoms/address/selected_address/types";

export interface IBuildingManagementServiceProvider
    extends IRoomInfosOnBuildingGetable,
        IBuildingVerifiable,
        IBuildingRegisterable,
        IRoomContractAdministrable {}

export interface IRoomInfosOnBuildingGetable {
    //getTentantsFromServer(buildingID: number): Promise<Building.Tenant[]>;
    getRoomInfos(buildingID: number): Promise<BuildingRoomInfo[]>;
}

export interface IBuildingVerifiable {
    verifyBuildingAddress(params: VerifyBuildingAddress.Params): Promise<VerifyBuildingAddress.Returns>;
}

export interface IBuildingRegisterable {
    registerBuilding(params: RegisterBuilding.Params): Promise<RegisterBuilding.Returns>;
}

export interface IRoomContractAdministrable {
    registerContract(params: RegisterContract.Params): Promise<boolean>;
    modifyContract(params: ModifyContract.Params): Promise<boolean>;
    deleteContract(contractID: DeleteContract.Params): Promise<boolean>;
    requestNotification(params: RequestNotification.Params): Promise<boolean>;
}

export namespace RegisterContract {
    export type Params = {
        contractorName: Building.RegisterContract.Params["contractor_name"];
        deposit: Building.RegisterContract.Params["deposit"];
        managementFee: Building.RegisterContract.Params["management_fee"];
        monthlyRent: Building.RegisterContract.Params["monthly_rent"];
        rentType: Building.RegisterContract.Params["rent_type"];
        roomId: Building.RegisterContract.Params["room_id"];
        expirationDate: Date;
        startDate: Date;
    };
}

export namespace ModifyContract {
    export type Params = RegisterContract.Params & {
        contractID: Building.ModifyContract.Params["contract_id"];
    };
}

export namespace DeleteContract {
    export type Params = number;
}

export namespace RegisterBuilding {
    export type Params = {
        accountRegiReqForms: Building.RegisterBuildng.Params["account_regi_req_forms"];
        basementInfo: number | null;
        buildingName: string;
        mfDueDate: number;
        mfNotiDate: number;
        ownerName: string;
        roadAddress: string;
        roomsInfo: number[];
    };

    export type Returns = {
        buildingID: number;
        roadAddress: string;
    } | null;
}

export namespace RequestNotification {
    export type Params = {
        contractID: Building.RequestNotification.Params["contract_id"];
        content: string;
        title: string;
    };
}

export namespace VerifyBuildingAddress {
    export type Params = SelectedAddressType;
    export type Returns = {
        id: VerifyBuildingAddressResult["building_id"];
        name: VerifyBuildingAddressResult["building_name"];
    } | null;
}

export type BuildingRoomInfo = {
    contractInfo: BuildingRoomContract;
    contractState: Building.RoomInfo["contract_state"];
    floor: number;
    residentName: string;
    residentPhoneNumber: string;
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
