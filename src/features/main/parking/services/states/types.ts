import { Parking } from "../../../../../libs/rest_apis/villife/parking/types";

export type VehicleOwnerType = "user" | "tenant" | "guest";

export type Vehicle = {
    ownerType: VehicleOwnerType;
    id: Parking.TenantVehicle["id"];
    room_number: Parking.TenantVehicle["room_number"];
    phone_number: Parking.TenantVehicle["phone_number"];
    model: Parking.TenantVehicle["model"];
    plate_number: Parking.TenantVehicle["plate_number"];
    vehicle_type: Parking.TenantVehicle["vehicle_type"];
    etd: Date;
    eta: Date;
    visiting_perpose?: Parking.GuestVehicle["visiting_perpose"];
};
