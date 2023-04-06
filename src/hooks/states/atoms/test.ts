import { atom } from "recoil"

export const testState = atom<string>({
    key: "testState",
    default: "바보",
})