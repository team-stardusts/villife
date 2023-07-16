import { Response, ResponseForTest } from "../../types";

// [TO-DO] 서버 API 적용 완료 후 Test interface 변경
export default interface IVillifeParkingManager extends Parking.IVehicleGettable {}

export namespace Parking {
    export interface IVehicleGettable {
        getVehicles(buildingID?: number): Response<TenantVehicle[]>;
        getGuestVehiclesOfBuilding(buildingID: number): Response<GuestVehicle[]>;
        updateUserVehicleEtda(params: VehicleEtdaUpdateParams): Response<VehicleInfoUpdateReturn>;
        updateUserVehicleInfo(params: VehicleInfopdateParams): Response<VehicleInfoUpdateReturn>;
        registerGuestVehicleToBuilding(params: RegisterGuestVehicleToBuildingParams): Response<GuestVehicle>;
        registerUserVehicle(params: RegisterUserVehicle.Params): Response<RegisterUserVehicle.Return>;
        sendPushNotification(params: SendPushNotification.Params): Response<SendPushNotification.Return>;
    }

    /* export interface ITestVehicleGettable {
        getMyVehicles(): ResponseForTest<TenantVehicle[]>;
        getBuildingRegistedVehicles(): ResponseForTest<TenantVehicle[]>;
        getBuildingGuestVehicles(): ResponseForTest<GuestVehicle[]>;
        updateMyVehicleEtda(params: Parking.VehicleEtdaUpdateParams): ResponseForTest<VehicleInfoUpdateReturnType>;
        updateMyVehicleInfo(params: Parking.VehicleInfopdateParams): ResponseForTest<VehicleInfoUpdateReturnType>;
    } */

    type VehicleType = "4WD" | "2WD";

    export namespace SendPushNotification {
        export type Params = {
            vehicleID: number;
            title: string;
            content: string;
        };

        export type Body = {
            vehicle_id: number;
            title: string;
            content: string;
        };

        export type Return = string;
    }

    export namespace RegisterUserVehicle {
        export type Params = {
            eta: number;
            etd: number;
            model: string;
            plateNumber: string;
            vehicleType: VehicleType;
        };
        export type Body = {
            eta: number;
            etd: number;
            model: string;
            plate_number: string;
            vehicle_type: VehicleType;
        };
        export type Return = TenantVehicle;
    }

    export type RegisterGuestVehicleToBuildingParams = {
        eta: number;
        etd: number;
        guestPhoneNumber: string;
        model: string;
        plateNumber: string;
        vehicleType: VehicleType;
        visitingPurpose: string;
    };

    export type RegisterGuestVehicleToBuildingBody = {
        eta: number;
        etd: number;
        guest_phone_number: string;
        model: string;
        plate_number: string;
        vehicle_type: VehicleType;
        visiting_purpose: string;
    };

    export type GetVehiclesRequestParam = {
        building_id?: number;
    };

    export type GetGuestVehiclesOfBuildingParam = {
        building_id: number;
    };

    export type UpdateUserVehicleEtdaBody = {
        eta: number;
        etd: number;
        vehicle_id: number;
    };

    export type UpdateUserVehicleInfoBody = {
        model: string;
        plate_number: string;
        vehicle_id: number;
    };

    export type TenantVehicle = {
        etd: number;
        eta: number;
        id: number;
        model: string;
        phone_number: string;
        plate_number: string;
        room_number: number;
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

    export type VehicleInfoUpdateReturn = string;
}
