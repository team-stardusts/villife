import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { objectToCamel, objectToSnake } from "ts-case-convert";
import { RoutesType } from "./data/types";
import routes from "./data/routes";
import VillifeUtility from "./clients/types/utility";
import VillifeError from "./errors";

//const env = new DotEnv();

abstract class VillifeClientCommon implements VillifeUtility.Refresher {
    private readonly _requester: AxiosInstance;
    private readonly _session: VillifeUtility.SessionStorage;
    protected readonly _routes: RoutesType = routes;

    constructor(baseURL: string, sessionStorage: VillifeUtility.SessionStorage) {
        this._session = sessionStorage;

        this._requester = axios.create({
            baseURL: baseURL, //env.api.villife.REST_API_BASE_URL,
            timeout: 5000,
            timeoutErrorMessage:
                "The request timed out.\
                Check the Stardusts server.",
        });

        this.onRequestFulfilled = this.onRequestFulfilled.bind(this);
        this.onRequestRejected = this.onRequestRejected.bind(this);
        this.onResponseFulfilled = this.onResponseFulfilled.bind(this);
        this.onResponseRejected = this.onResponseRejected.bind(this);

        this._requester.interceptors.request.use(this.onRequestFulfilled, this.onRequestRejected);
        this._requester.interceptors.response.use(this.onResponseFulfilled, this.onResponseRejected);
    }

    private onRequestFulfilled(
        config: InternalAxiosRequestConfig<any>
    ): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> {
        return config;
    }

    private onRequestRejected(error: unknown) {}

    private onResponseFulfilled(
        response: AxiosResponse<any, any>
    ): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> {
        return response;
    }

    private async onResponseRejected(error: unknown): Promise<any> {
        if (axios.isAxiosError(error) && error.response) {
            switch (error.response.status) {
                case 511:
                    return await this.refresh().then(
                        async () => await this.requestWithAuth(error.config as AxiosRequestConfig<any>)
                    );
                default:
                    console.error(`[${error.name}]`, error.message);
                    throw error;
            }
        }

        throw error;
    }

    /* private isSuccessful(statusCode: number | undefined): boolean {
        if (statusCode === undefined) {
            return false;
        } else {
            return 200 <= statusCode && statusCode <= 299 ? true : false;
        }
    } */

    public async refresh(params?: VillifeUtility.TokensForRefresh): Promise<VillifeUtility.RefreshedToken> {
        const tokens = await this._session.getTokens();

        if (tokens === null) {
            // [TO-DO] Refresh failed error로 교체해야함
            console.debug("[REFRESH_FAILED]", "There are no tokens.");
            throw new VillifeError("[REFRESH_FAILED] There are no tokens.");
        }

        if (params === undefined) {
            params = {
                expiredAccessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            };
        }
        const route: string = this._routes.auth.loginRefresh;
        const refresh = await this.request<VillifeUtility.TokensForRefresh, VillifeUtility.RefreshedToken>({
            method: "post",
            url: route,
            data: params,
        })
            .then((res) => {
                console.log("[REFRESH]", "Tokens have been refreshed.");
                return res;
            })
            .catch((err) => {
                console.error("[REFRESH_ERROR]", err);
                throw err;
            });

        const setResult = await this._session.setTokens({
            ...tokens,
            accessToken: refresh.accessToken,
        });

        if (!setResult) {
            throw new VillifeError("[REFRESH_ERROR] Failed to save tokens.");
        }

        return refresh;
    }

    protected async requestWithAuth<Payload = any, Return = any>(config: AxiosRequestConfig<Payload>): Promise<Return> {
        const tokens = await this._session.getTokens();

        if (config.headers === undefined) {
            config.headers = {};
        }

        config.headers.Authorization = `Bearer ${tokens?.accessToken}`;
        return await this.request<Payload, Return>(config);
    }

    protected async request<Payload = any, Return = any>(config: AxiosRequestConfig<Payload>): Promise<Return> {
        if (config.params) {
            config.params = objectToSnake(config.params);
        }

        if (config.data) {
            config.data = objectToSnake(config.data) as Payload;
        }

        const result = await this._requester(config)
            .then((res: AxiosResponse<VillifeUtility.VanillaResponse<Return>, Payload>) => {
                if (res.data?.errorCode) {
                    // Throw error with message.
                    throw new VillifeError("[TO-DO]: VillifeError");
                }

                // Villife Legacy API와의 호환성을 위한 코드
                if (res.data?.data === undefined) {
                    return objectToCamel(res.data) as Return;
                }

                if (res.data.data === null) {
                    throw new VillifeError("[TO-DO]: VillifeError");
                }

                if (typeof res.data.data === "object") {
                    return objectToCamel(res.data.data) as Return;
                }

                return res.data.data;
            })
            .catch((err: AxiosError<Return, Payload>) => {
                if (err?.response) {
                    // 요청이 이루어졌으며 서버에게서 원하지 않는 결과를 받음. (not 2xx)
                } else if (err?.request) {
                    // 요청이 이루어졌으나, 응답을 받지 못함.
                    // 서버 측의 문제일 가능성이 높은 구문.
                } else {
                    // 오류를 발생시킨 요청을 설정하는 도중 문제가 발생함.
                }

                console.error("[AxiosError]", err, err.status, err.cause, err.response?.data);

                throw err;
            });

        //console.log(this.isSuccessful(result?.status));
        return result;
    }
}

export default VillifeClientCommon;
