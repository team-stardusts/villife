import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { TestDataState, testDataState } from "../common/hooks/states/atoms/test";

interface ITestDataProvider {
    rawdata: TestDataState;
    name: string;
    age: number;
    isAudult: boolean;
}

export default function useTestService(): ITestDataProvider | undefined {
    const [teststate, setTeststate] = useRecoilState<TestDataState | null>(testDataState);

    useEffect(() => {
        setTeststate({
            ...teststate,
            name: "홍길동",
            age: 20,
        });
    }, []);

    useEffect(() => {
        if (teststate === null) return;
        /* setTimeout(() => {
            setTeststate({
                ...teststate,
                name: teststate.name + "!",
            });
        }, 1000); */
        console.log(teststate);
    }, [teststate]);

    if (teststate === null) {
        return undefined;
    }

    class TestDataProvider implements ITestDataProvider {
        private _rawdata: TestDataState;

        get rawdata(): TestDataState {
            return this._rawdata;
        }

        get name(): string {
            return this._rawdata.name;
        }

        set name(newName: string) {
            if (teststate === null) return;

            setTeststate({
                ...teststate,
                name: newName,
            });
        }

        get age(): number {
            return this._rawdata.age;
        }

        get isAudult(): boolean {
            return this._rawdata.age > 19;
        }

        public constructor(rawdata: TestDataState) {
            this._rawdata = rawdata;
        }
    }

    return new TestDataProvider(teststate);
}
