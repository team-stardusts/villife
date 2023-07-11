import { Response } from "../../types";

interface BuildingVerifiable {
    ValidateUserResidenceForTest(params: UserResidenceValidationParams): Response<string>;
    ValidateVehicleResidenceForTest(params: VehicleResidenceValidationParams): Response<string>;
    RequestValidationOfUserRegidence(param: UserResidenceValidationParams): Response<string>;
}
export type UserResidenceValidationParams = {
    building_id: number;
    room_number: number;
};
export type VehicleResidenceValidationParams = {
    eta: number;
    etd: number;
    model: string;
    plate_number: string;
    vehicle_type: string;
};

// Interface of VillifeBuildingManager
export default interface IVillifeBuildingManager extends BuildingVerifiable {}
