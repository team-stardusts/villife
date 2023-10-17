import { atom } from "recoil";
import { MFHistory } from "./types";

export const buildingMFHistory = atom<MFHistory>({
    key: "buildingMFHistory",
    default: [],
});

export const userMFHistory = atom<MFHistory>({
    key: "userMFHistory",
    default: [],
});
