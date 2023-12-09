import { atom } from "recoil";

export type TestDataState = {
    name: string;
    age: number;
};

export const testDataState = atom<TestDataState | null>({
    key: "testDataState",
    default: null,
});
