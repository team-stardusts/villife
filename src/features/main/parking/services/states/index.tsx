import { atom } from "recoil";
import { Vehicle } from "./types";
import { RequestedVehicleData } from "../../../../../libs/storage/tables/vehicle/types";

export const vehiclesState = atom<Vehicle[]>({
    key: "vehiclesState",
    default: [],
});
