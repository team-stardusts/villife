import axios, { AxiosRequestConfig } from "axios";
import { Requestable, Response } from "./types";

abstract class AREST implements Requestable {
    readonly requester = axios.create({});
    readonly routes: any;

    private isSuccessful(status_code: number | undefined): boolean {
        if (status_code === undefined) {
            return false;
        } else {
            return 200 <= status_code && status_code <= 299 ? true : false;
        }
    }

    public async request<T = any, U = any>(config: AxiosRequestConfig<T>): Response<U> {
        const result = await this.requester(config)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });

        //console.log(this.isSuccessful(result?.status));
        return {
            isSuccessful: this.isSuccessful(result?.status),
            data: result,
        };
    }
}

export default AREST;
