export type UseProgressiveListReturns = {
    startProgressList<T>(params: StartProgressListParams<T>): Promise<void>;
};

export type StartProgressListParams<T> = {
    delay?: number;
    targetList: T[];
    StateSettingFuncOfTempList: React.Dispatch<React.SetStateAction<T[]>>;
};
