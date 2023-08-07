import { Response, ResponseForTest } from "../../types";

// Interface of VillifeBuildingManager
export default interface IVillifeBuildingManager extends IBuildingVerifiable {}

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
    getTenantsTest(params: Building.GetTentants.Params): ResponseForTest<Building.GetTentants.Returns>;
}

export namespace Building {
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

    export namespace GetTentants {
        export type Params = {
            buildingID: number;
        };

        export type Returns = Tenant[];
    }

    export type Tenant = {
        floor: number;
        room_number: number;
        room_state: RoomState;
        contract_status: ContractStatus;
        contract?: Contract;
        resident_id?: string;
        resident_name?: string;
        resident_phone_number?: string;
    };

    export type Contract = {
        rent_type: RentType;
        deposit: number;
        monthly_rent: number;
        management_fee: number;
        start_date: number;
        expiration_date: number;
        created_at: number;
        updated_at: number;
    };

    // 만료 / 만료 임박 / 없음 / 정상
    export type ContractStatus = "expired" | "imminent-expiration" | "absense" | "normal";
    export type RoomState = "empty" | "signed" | "unsigned";
    export type RentType = "lump-sum-deposit" | "partial-lump-sum-deposit" | "monthly-rent";
}
