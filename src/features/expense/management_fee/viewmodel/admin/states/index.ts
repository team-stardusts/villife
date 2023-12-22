import { atom } from "recoil";
import { BuildingMFHistory } from "../types";

export const buildingMFHistoryState = atom<BuildingMFHistory[]>({
    key: "expense_admin_management_fee",
    default: [],
});
