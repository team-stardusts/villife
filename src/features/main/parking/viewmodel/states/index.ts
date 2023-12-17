import { atom } from "recoil";
import { RequestedVehicle, Vehicle } from "../types";

export const vehiclesState = atom<Vehicle[]>({
    key: "parking_vehicles_state",
    default: [],
});

export const requestedVehiclesState = atom<RequestedVehicle[]>({
    key: "parking_requested_vehicles_state",
    default: [],
});
