import { Response } from "../../types";

interface BuildingVerifiable {
    ValidateUserResidenceForTest(params: UserResidenceValidationParams): Response<string>;
}

export type VerifyBuildingAddressResult = {
    building_id: number;
    building_name: string;
};

export type UserResidenceValidationParams = {
    building_id: number;
    room_number: number;
};

// Interface of VillifeBuildingManager
export default interface IVillifeBuildingManager extends BuildingVerifiable {}
