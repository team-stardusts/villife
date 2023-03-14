import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Requestable, Responsable } from "./types";

abstract class ARestApi implements Requestable {
    requester = axios.create({});
    routes: any;

    private isSuccessful(status_code: number): boolean {
        return (200 <= status_code && status_code <= 299) ? true : false
    }

    public async request<T, U>(config: AxiosRequestConfig<T>): Promise<Responsable<U>> {
        const result: AxiosResponse<U, any> = await this.requester(config)
            .then((res => {
                return res;
            }))
            .catch((err) => {
                return err.response;
            });

        return {
            isSuccessful: this.isSuccessful(result.status),
            data: result.data,
        };
    }
}

export default ARestApi;