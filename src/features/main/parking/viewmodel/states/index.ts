import { atom } from "recoil";
import Villife from "../../../../../libs/villife-client/types";

export type VehicleOwnerType = "user" | "tenant" | "guest";
export type Vehicle = Villife.Parking.TenantVehicle & {
    ownerType: VehicleOwnerType;
    etd: Date;
    eta: Date;
    visitingPurpose?: string;
};

const vehiclesState = atom<Vehicle[]>({
    key: "parking_vehicle_state",
    default: [],
});

export default vehiclesState;
