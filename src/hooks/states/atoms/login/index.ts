import { atom } from "recoil";
import { IsLogggedInType, LoginDataStateType } from "./types";

export const isLoggedInState = atom<IsLogggedInType>({
    key: "isLoggedInState",
    default: null,
});

export const loginDataState = atom<LoginDataStateType>({
    key: "loginDataState",
    default: null,
});
