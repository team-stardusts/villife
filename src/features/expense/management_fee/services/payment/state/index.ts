import { atom } from "recoil";
import { BuildingMFHistory, UserMFHistory } from "./types";

export const buildingMFHistory = atom<BuildingMFHistory>({
    key: "buildingMFHistory",
    default: [],
});

export const userMFHistory = atom<UserMFHistory>({
    key: "userMFHistory",
    default: [],
});
