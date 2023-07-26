import { atom } from "recoil";
import { LoginDataType } from "../../../../../../libs/storage/tables/login/types";

export const loginDataState = atom<LoginDataType | null>({
    key: "loginDataState",
    default: null,
});
