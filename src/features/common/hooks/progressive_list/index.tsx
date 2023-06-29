import { StartProgressListParams, UseProgressiveListReturns } from "./types";

const DEFAULT_LIST_PROGRESS_DELAY: number = 50;

export default function useProgressiveList(): UseProgressiveListReturns {
    async function startProgressList<T>({
        delay,
        targetList,
        StateSettingFuncOfTempList,
    }: StartProgressListParams<T>): Promise<void> {
        const _delay = delay || DEFAULT_LIST_PROGRESS_DELAY;

        if (targetList.length === 0) return;

        for (let i = 0; i < targetList.length; i++) {
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve("");
                }, _delay)
            );

            StateSettingFuncOfTempList((prevData) => {
                const newData = [...prevData];
                newData[i] = targetList[i];
                return newData;
            });
        }

        return;
    }

    return {
        startProgressList,
    };
}
