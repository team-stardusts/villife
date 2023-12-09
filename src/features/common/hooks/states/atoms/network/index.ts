import { atom } from "recoil";

export const isConnetedToNetworkState = atom<boolean>({
    key: "isConnetedToNetworkState",
    default: false,
});
