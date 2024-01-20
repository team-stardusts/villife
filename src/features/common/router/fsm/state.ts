import { atom } from "recoil";
import { VillifeAppState, VillifeLoginState } from "./types";

export const villifeLoginState = atom<VillifeLoginState>({
    key: "villife_login_state",
    default: VillifeLoginState.NORMAL,
});

export const villifeAppState = atom<VillifeAppState>({
    key: "villife_app_state",
    default: VillifeAppState.IDLE,
});
