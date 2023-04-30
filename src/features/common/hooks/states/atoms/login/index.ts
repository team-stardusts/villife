import { atom } from "recoil";
import { LoginDataStateType } from "./types";

export const loginDataState = atom<LoginDataStateType>({
    key: "loginDataState",
    default: null,
});
