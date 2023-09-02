import { Response, ResponseForTest } from "../../types";

// Interface of VillifeBuildingManager
export default interface IVillifeBuildingManager extends IBuildingVerifiable, IBuildingRegistable {}

interface IBuildingVerifiable {
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

interface IBuildingRegistable {
    registerBuildng(params: Building.RegisterBuildng.Params): Response<Building.RegisterBuildng.Returns>;
}

export namespace Building {
    export namespace RegisterBuildng {
        export type Params = {
            basement_info: number;
            building_name: string;
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

    export type RoomInfo = {
        contract_info?: Contract;
        contract_state: ContractStatus;
        floor: number;
        resident_name?: string;
        resident_phone_number?: string;
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

    // 만료 / 만료 임박 / 없음 / 정상
    export type ContractStatus = "expired" | "imminent-expiration" | "absense" | "normal";
    export type RoomState = "empty" | "signed" | "unsigned";
    export type RentType = "" | "lump-sum-deposit" | "partial-lump-sum-deposit" | "monthly-rent";
}
