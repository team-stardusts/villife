import { atom } from "recoil";
import { UserDataType } from "../../../../../../../libs/storage/tables/user/types";

export const userBasicInfoState = atom<UserDataType | null>({
    key: "userBasicInfoState",
    default: null,
});
