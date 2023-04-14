import { atom } from "recoil";
import { IsLogggedInType, LoginDataStateType } from "./types";

export const loginDataState = atom<LoginDataStateType>({
    key: "loginDataState",
    default: null,
});
