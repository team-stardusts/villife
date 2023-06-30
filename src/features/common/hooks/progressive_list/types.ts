/* export type UseProgressiveListReturns = {
    startProgressList<T>(params: StartProgressListParams<T>): Promise<void>;
}; */

export type UseProgressiveListParams<T> = {
    targetList: T[];
    delay?: number;
};

export type UseProgressiveListReturns<T> = T[];
