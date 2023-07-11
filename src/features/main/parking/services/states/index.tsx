import { atom } from "recoil";
import { Vehicle } from "./types";

export const vehiclesState = atom<Vehicle[]>({
    key: "vehiclesState",
    default: [],
});
