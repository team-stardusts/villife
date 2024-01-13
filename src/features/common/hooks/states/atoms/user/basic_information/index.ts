import { Villife } from "@team-stardusts/villife-client";
import { atom } from "recoil";

export const userBasicInfoState = atom<Villife.User.User | null>({
    key: "userBasicInfoState",
    default: null,
});
