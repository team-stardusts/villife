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
        room_type: RoomType;
        contract_type: ContractType;
        room_number: number;
        contract_started_at: number;
        contract_ended_at: number;
    };

    export type RoomType = "empty" | "registered" | "unregistered";
    export type ContractType = "lump-sum-deposit" | "partial-lump-sum-deposit" | "monthly-rent";
}
