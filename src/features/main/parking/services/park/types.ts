import { GuestVehicle, TenantVehicle } from "../../../../../libs/rest_apis/villife/parking/types";

export type ParkServiceReturns = {
    getMyVehicles(): Promise<TenantVehicle[]>;
    getVehicles(): Promise<TenantVehicle[]>;
    getGuestVehicles(): Promise<GuestVehicle[]>;
};
