import { atom } from "recoil";
import { AdminInformation } from "./type";

// 첫 로그인 한 관리자를 식별하기 위해 undefined 추가
export const adminInfoState = atom<AdminInformation | null | undefined>({
    key: "adminInfoState",
    default: null,
});
