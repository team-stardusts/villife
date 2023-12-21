import { atom } from "recoil";
import { UserManagementFee } from "../types";

export const userManagementFeesState = atom<UserManagementFee[]>({
    key: "expense_user_management_fee",
    default: [],
});
