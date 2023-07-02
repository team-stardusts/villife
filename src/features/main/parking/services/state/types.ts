import { GuestVehicle, TenantVehicle } from "../park/types";

export type VehiclesStateType = {
    userVehicles: TenantVehicle[];
    vehicles: TenantVehicle[];
    guestVehicles: GuestVehicle[];
};

export type TenantVehicleStateType = TenantVehicle[];
export type GuestVehicleStateType = GuestVehicle[];
