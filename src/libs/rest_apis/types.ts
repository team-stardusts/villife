import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface Requestable {
    readonly requester: AxiosInstance;
    readonly routes: {
        [key: string]: string | object;
    };
    request(config: AxiosRequestConfig): any;
}

export interface Responsable<T> {
    isSuccessful: boolean;
    data: AxiosResponse<T> | undefined;
}

export type Response<T> = Promise<Responsable<T>>;
