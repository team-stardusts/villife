import { Response, ResponseForTest } from "../../types";

// [TO-DO] 서버 API 적용 완료 후 Test interface 변경
export default interface IVillifeParkingManager extends Parking.IVehicleGettable {}

export namespace Parking {
    export interface IVehicleGettable {
        getVehicles(buildingID?: number): Response<TenantVehicle[]>;
        getGuestVehiclesOfBuilding(buildingID: number): Response<GuestVehicle[]>;
        updateUserVehicleEtda(params: Parking.VehicleEtdaUpdateParams): Response<VehicleInfoUpdateReturnType>;
        updateUserVehicleInfo(params: Parking.VehicleInfopdateParams): Response<VehicleInfoUpdateReturnType>;
    }

    export interface ITestVehicleGettable {
        getMyVehicles(): ResponseForTest<TenantVehicle[]>;
        getBuildingRegistedVehicles(): ResponseForTest<TenantVehicle[]>;
        getBuildingGuestVehicles(): ResponseForTest<GuestVehicle[]>;
        updateMyVehicleEtda(params: Parking.VehicleEtdaUpdateParams): ResponseForTest<VehicleInfoUpdateReturnType>;
        updateMyVehicleInfo(params: Parking.VehicleInfopdateParams): ResponseForTest<VehicleInfoUpdateReturnType>;
    }

    type VehicleType = "4WD" | "2WD";

    export type GetVehiclesRequestParamType = {
        building_id?: number;
    };

    export type GetGuestVehiclesOfBuildingParamType = {
        building_id: number;
    };

    export type UpdateUserVehicleEtdaBodyType = {
        eta: number;
        etd: number;
        vehicle_id: number;
    };

    export type UpdateUserVehicleInfoBodyType = {
        model: string;
        plate_number: string;
        vehicle_id: number;
    };

    export type TenantVehicle = {
        id: number;
        room_number: number;
        phone_number: string;
        model: string;
        plate_number: string;
        etd: number;
        eta: number;
        vehicle_type: VehicleType;
    };

    export type GuestVehicle = TenantVehicle & {
        visiting_perpose: string;
    };

    export type VehicleEtdaUpdateParams = {
        vehicleID: number;
        etd: number;
        eta: number;
    };

    export type VehicleInfopdateParams = {
        vehicleID: number;
        plateNumber: string;
        model: string;
    };

    export type VehicleInfoUpdateReturnType = string;
}
