import { useCallback, useEffect, useState } from "react";
import { UseProgressiveListParams, UseProgressiveListReturns } from "./types";

const DEFAULT_LIST_PROGRESS_DELAY: number = 50;

export default function useProgressiveList<T>(targetList: T[], delay?: number): UseProgressiveListReturns<T> {
    const [delayedList, setDelayedList] = useState<T[]>([]);

    const progress = useCallback(async () => {
        const _delay = delay || DEFAULT_LIST_PROGRESS_DELAY;

        for (let i = 0; i < targetList.length; i++) {
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve("");
                }, _delay)
            );

            setDelayedList((prevData) => {
                const newData = [...prevData];
                newData[i] = targetList[i];
                return newData;
            });
        }
    }, [targetList, delay]);

    useEffect(() => {
        progress();
    }, []);

    return delayedList;

    /* const startProgressList = useCallback(({
        delay,
        targetList,
    }: StartProgressListParams): Promise<void> {
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
    }, [])

    return; */
}
