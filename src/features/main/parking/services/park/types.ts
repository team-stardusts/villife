import { Parking } from "../../../../../libs/rest_apis/villife/parking/types";

export type ParkServiceReturns = {
    getMyVehicles(): Promise<Parking.TenantVehicle[]>;
    getVehicles(): Promise<Parking.TenantVehicle[]>;
    getGuestVehicles(): Promise<Parking.GuestVehicle[]>;
    updateMyVehicleEtda(params: Parking.VehicleEtdaUpdateParams): Promise<boolean>;
    updateMyVehicleInfo(params: Parking.VehicleInfopdateParams): Promise<boolean>;
};
