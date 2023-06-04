import { atom } from "recoil";
import { AdminInformation } from "./type";

export const adminInfoState = atom<AdminInformation | null>({
    key: "adminInfoState",
    default: null,
});
