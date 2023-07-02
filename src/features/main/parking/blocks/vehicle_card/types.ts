import { ParkServiceReturns, TenantVehicle } from "../../services/park/types";

export type VehicleCardViewProps = {
    vehicles: TenantVehicle[];
    cardWidth: number;
};

export type VehicleCardProps = {
    vehicle: TenantVehicle;
    cardWidth: number;
    updateVehicleInfo: ParkServiceReturns["updateUserVehicleInfo"];
    updateVehicleEtda: ParkServiceReturns["updateUserVehicleEtda"];
};
