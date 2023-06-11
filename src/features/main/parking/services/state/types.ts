import { GuestVehicle, TenantVehicle } from "../park/types";

export type VehiclesStateType = {
    myVehicles: TenantVehicle[];
    vehicles: TenantVehicle[];
    guestVehicles: GuestVehicle[];
};
