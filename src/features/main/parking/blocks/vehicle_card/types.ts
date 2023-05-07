import { TenantVehicle } from "../../../../../libs/rest_apis/villife/parking/types";

export type VehicleCardViewProps = {
    vehicles: TenantVehicle[];
    cardWidth: number;
};

export type VehicleCardProps = {
    vehicle: TenantVehicle;
    cardWidth: number;
};
