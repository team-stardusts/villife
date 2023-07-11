import { atom } from "recoil";
import { VehiclesStateType } from "./types";

export const vehiclesState = atom<VehiclesStateType>({
    key: "guestVehiclesState",
    default: [],
});
