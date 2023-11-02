import { atom } from "recoil";
import { ManagementFee } from "../../../../../../libs/rest_apis/villife/expense/types";

export const userBillHistoryState = atom<ManagementFee.ManagementFee[]>({
    key: "userBillHistoryState",
    default: [],
});

export const buildingBillHistoryState = atom<ManagementFee.ManagementFee[]>({
    key: "buildingBillHistoryState",
    default: [],
});
