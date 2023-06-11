import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface Requestable {
    readonly requester: AxiosInstance;
    readonly routes: {
        [key: string]: string | object;
    };
    request(config: AxiosRequestConfig): any;
}

export type Responsable<T> = {
    isSuccessful: boolean;
    data: AxiosResponse<T> | undefined;
};

type TestResponsable<T> = {
    isSuccessful: boolean;
    data: {
        data: T | undefined;
    };
};

export type Response<T> = Promise<Responsable<T>>;
export type ResponseForTest<T> = Promise<TestResponsable<T>>;
