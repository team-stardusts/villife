import { atom } from "recoil";
import Villife from "../../../../../../../libs/villife-client/types";

export const userBasicInfoState = atom<Villife.User.User | null>({
    key: "userBasicInfoState",
    default: null,
});
