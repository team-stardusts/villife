import { AxiosInstance, AxiosRequestConfig } from "axios";

export interface Requestable {
    readonly requester: AxiosInstance;
    readonly routes: {
        [key: string]: string | object;
    };
    request(config: AxiosRequestConfig): any;
}

export interface Responsable<T> {
    isSuccessful: boolean;
    data: T;
}