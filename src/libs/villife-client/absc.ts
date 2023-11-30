import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import DotEnv from "../dotenv";
import Villife from "./types";

const env = new DotEnv();

abstract class VillifeClientCommon {
    private _requester: AxiosInstance = axios.create({
        baseURL: env.api.villife.REST_API_BASE_URL,
        timeout: 5000,
        timeoutErrorMessage:
            "The request timed out.\
            Check the Stardusts server.",
    });

    private isSuccessful(statusCode: number | undefined): boolean {
        if (statusCode === undefined) {
            return false;
        } else {
            return 200 <= statusCode && statusCode <= 299 ? true : false;
        }
    }

    public async request<D = any, T = any>(config: AxiosRequestConfig<D>): Villife.PromiseResponse<T> {
        const result = await this._requester(config)
            .then((res: AxiosResponse<T, D>) => {
                return res;
            })
            .catch((err: AxiosError<T, D>) => {
                return err.response;
            });

        //console.log(this.isSuccessful(result?.status));
        return {
            data: result?.data,
            isSuccessful: this.isSuccessful(result?.status),
            statusCode: result?.status,
        };
    }
}
