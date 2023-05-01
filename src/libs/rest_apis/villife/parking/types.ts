import { Response } from "../../types";

interface VehicleGettable {
    getMyVehicles(): Response<TenantVehicle[]>;
    getBuildingRegistedVehicles(): Response<TenantVehicle[]>;
    getBuildingGuestVehicles(): Response<GuestVehicle[]>;
}

export type TenantVehicle = {
    id: number;
    room_number: number;
    phone_number: string;
    model: string;
    plate_number: string;
    departure_time: string;
    arrival_time: string;
    //vehicle_type: string;
};

export type GuestVehicle = TenantVehicle & {
    perpose: string;
};

export type VerifyBuildingAddressParams = {
    address: string;
};

export type VerifyBuildingAddressResult = {
    building_id: number;
    building_name: string;
};

export default interface IVillifeParkingManager extends VehicleGettable {}
