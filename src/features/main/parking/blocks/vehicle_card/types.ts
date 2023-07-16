import { Vehicle } from "../../services/states/types";

export type VehicleCardViewProps = {
    vehicles: Vehicle[];
    cardWidth: number;
};

export type VehicleCardProps = {
    vehicle: Vehicle;
    cardWidth: number;
};
