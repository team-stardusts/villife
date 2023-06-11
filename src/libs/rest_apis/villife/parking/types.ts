import { Response, ResponseForTest } from "../../types";

// [TO-DO] 서버 API 적용 완료 후 Test interface 변경
export default interface IVillifeParkingManager extends Parking.ITestVehicleGettable {}

export namespace Parking {
    export interface IVehicleGettable {
        getMyVehicles(): Response<TenantVehicle[]>;
        getBuildingRegistedVehicles(): Response<TenantVehicle[]>;
        getBuildingGuestVehicles(): Response<GuestVehicle[]>;
        updateMyVehicleEtda(params: Parking.VehicleEtdaUpdateParams): Response<VehicleInfoUpdateReturnType>;
        updateMyVehicleInfo(params: Parking.VehicleInfopdateParams): Response<VehicleInfoUpdateReturnType>;
    }

    export interface ITestVehicleGettable {
        getMyVehicles(): ResponseForTest<TenantVehicle[]>;
        getBuildingRegistedVehicles(): ResponseForTest<TenantVehicle[]>;
        getBuildingGuestVehicles(): ResponseForTest<GuestVehicle[]>;
        updateMyVehicleEtda(params: Parking.VehicleEtdaUpdateParams): ResponseForTest<VehicleInfoUpdateReturnType>;
        updateMyVehicleInfo(params: Parking.VehicleInfopdateParams): ResponseForTest<VehicleInfoUpdateReturnType>;
    }

    type VehicleType = "4WD" | "2WD";

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
