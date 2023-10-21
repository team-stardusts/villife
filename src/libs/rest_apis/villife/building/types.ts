import { Response, ResponseForTest } from "../../types";

// Interface of VillifeBuildingManager
export default interface IVillifeBuildingManager extends BuildingVerifiable, BuildingAdministable {}

interface BuildingVerifiable {
    validateUserResidenceForTest(
        params: Building.UserResidenceValidation.Params
    ): Response<Building.UserResidenceValidation.Returns>;
    validateVehicleResidenceForTest(
        params: Building.VehicleResidenceValidation.Params
    ): Response<Building.VehicleResidenceValidation.Returns>;
    requestValidationOfUserRegidence(
        params: Building.UserResidenceValidation.Params
    ): Response<Building.UserResidenceValidation.Returns>;
    getRoomInfosInBuilding(
        params: Building.GetRoomInfosInBuilding.Params
    ): Response<Building.GetRoomInfosInBuilding.Returns>;
}

interface BuildingAdministable {
    getBuildingInfo(params: Building.GetBuildngInfo.Params): Response<Building.GetBuildngInfo.Returns>;
    registerBuildng(params: Building.RegisterBuildng.Params): Response<Building.RegisterBuildng.Returns>;
    registerContract(params: Building.RegisterContract.Params): Response<Building.RegisterContract.Returns>;
    modifyContract(params: Building.ModifyContract.Params): Response<Building.ModifyContract.Returns>;
    deleteContract(params: Building.DeleteContract.Params): Response<Building.DeleteContract.Returns>;
    requestNotification(params: Building.RequestNotification.Params): Response<Building.RequestNotification.Returns>;
}

export namespace Building {
    export namespace GetBuildngInfo {
        export type Params = {
            buildingID: number;
        };

        export type ReqParams = {
            building_id: number;
        };

        export type Returns = BuildingInfo;
    }

    export namespace RegisterBuildng {
        export type Params = {
            basement_info: number;
            building_name: string;
            mf_due_date: number;
            mf_noti_date: number;
            owner_name: string;
            road_addr: string;
            room_info: number[];
        };

        export type Returns = {
            building_id: number;
            road_addr: string;
        };
    }

    export namespace UserResidenceValidation {
        export type Params = {
            building_id: number;
            room_number: number;
        };

        export type Returns = string;
    }

    export namespace VehicleResidenceValidation {
        export type Params = {
            eta: number;
            etd: number;
            model: string;
            plate_number: string;
            vehicle_type: string;
        };

        export type Returns = string;
    }

    export namespace GetRoomInfosInBuilding {
        export type Params = {
            building_id: number;
        };

        export type Returns = RoomInfo[];
    }

    export type BuildingInfo = {
        bank_accounts: BuildingBackAccountInfo[];
        building_id: number;
        building_name: string;
        mf_due_date: number;
        mf_noti_date: number;
        owner_name: string;
        road_addr: string;
    };

    export type BuildingBackAccountInfo = {
        account_id: number;
        account_number: string;
        account_type: string;
        bank_name: string;
        owner_name: string;
    };

    export type RoomInfo = {
        contract_info: Contract;
        contract_state: ContractStatus;
        floor: number;
        resident_name: string;
        resident_phone_number: string;
        room_number: number;
        room_id: number;
        room_state: RoomState;
        //resident_id?: string;
    };

    export type Contract = {
        contract_id: number;
        deposit: number;
        expiration_date: number;
        management_fee: number;
        monthly_rent: number;
        rent_type: RentType;
        start_date: number;
        //created_at: number;
        //updated_at: number;
    };
    /* 
    {
        "auto_mf_billing": true,
        "contractor_name": "string",
        "delinquency_rate": 0,
        "deposit": 0,
        "expiration_date": 0,
        "management_fee": 0,
        "monthly_rent": 0,
        "rent_type": "string",
        "room_id": 0,
        "start_date": 0
    } 
    */

    export namespace RegisterContract {
        export type Params = {
            contractor_name: string;
            deposit: Contract["deposit"];
            expiration_date: Contract["expiration_date"];
            management_fee: Contract["management_fee"];
            monthly_rent: Contract["monthly_rent"];
            rent_type: Contract["rent_type"];
            room_id: RoomInfo["room_id"];
            start_date: Contract["start_date"];
        };

        export type Returns = string;
    }

    export namespace DeleteContract {
        export type Params = {
            contract_id: Contract["contract_id"];
        };

        export type Returns = string;
    }

    export namespace ModifyContract {
        export type Params = RegisterContract.Params & {
            contract_id: number;
        };
        export type Returns = string;
    }

    export namespace RequestNotification {
        export type Params = {
            contract_id: number;
            content: string;
            title: string;
        };

        export type Returns = string;
    }

    // 만료 / 만료 임박 / 없음 / 정상
    export type ContractStatus = "expired" | "ImminentExpiration" | "absense" | "normal";
    export type RoomState = "empty" | "signed" | "unsigned";
    export type RentType = "" | "lump-sum-deposit" | "monthly-rent";
}
