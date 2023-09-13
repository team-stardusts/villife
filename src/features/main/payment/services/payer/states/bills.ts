import { atom } from "recoil";
import { Payment } from "../../../../../../libs/rest_apis/villife/payment/types";

export const userBillHistoryState = atom<Payment.ManagementFee[]>({
    key: "userBillHistoryState",
    default: [],
});

export const buildingBillHistoryState = atom<Payment.ManagementFee[]>({
    key: "buildingBillHistoryState",
    default: [],
});
