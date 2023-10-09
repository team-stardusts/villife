import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { RoutesType } from "./routes/types";
import AREST from "../absc";
import { Response, ResponseForTest } from "../types";
import VillifeStorage from "../../storage";
import { Authority, RefreshParmas, RefreshResult } from "./types";
import routes from "./routes";
import DotEnv from "../../dotenv";

export const VILLIFE_AUTHORITY: Authority = {
    RENTER: 1,
    OWNER: 2,
    ADMIN: 3,
    SITE_ADMIN: 777,
} as const;

export const RESPONSE_STATUS = {
    TIMEOUT: 408,
    NETWORK_AUTHENTICATION_REQUIRED: 511,
} as const;

const env = new DotEnv();

class AVillifeServerModule extends AREST {
    readonly requester: AxiosInstance = axios.create({
        baseURL: env.api.villife.REST_API_BASE_URL,
        timeout: 5000,
        timeoutErrorMessage:
            "The request timed out.\
            Check the Stardusts server.",
    });

    readonly routes: RoutesType = routes;

    constructor() {
        super();
        this.requester.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status !== RESPONSE_STATUS.NETWORK_AUTHENTICATION_REQUIRED) {
                        console.error(`[${error.name}]`, error.message);
                        return Promise.reject(error);
                    }
                    const refresh = await this.refresh();

                    if (!refresh.isSuccessful || refresh.data?.data === undefined) {
                        return Promise.reject(error);
                    }

                    if (error.config?.headers !== undefined) {
                        error.config.headers.Authorization = `Bearer ${refresh.data?.data.access_token}`;
                    }

                    return this.requester.request(error.config as AxiosRequestConfig<any>);
                }
                return Promise.reject(error);
            }
        );
    }

    public async requestForTest<T>(param: T): ResponseForTest<T> {
        return Promise.resolve({
            isSuccessful: true,
            data: {
                data: param,
            },
        });
    }

    public async requestAuthable<T = any, U = any>(config: AxiosRequestConfig<T>): Response<U> {
        const logindata = await VillifeStorage.getInstance().login.get();

        if (config.headers === undefined) {
            config.headers = {};
        }

        config.headers.Authorization = `Bearer ${logindata?.accessToken}`;

        return await this.request<any, U>(config);
    }

    public async refresh(params?: RefreshParmas): Response<RefreshResult> {
        const storage = VillifeStorage.getInstance();
        const logindata = await storage.login.get();
        let route: string = this.routes.auth.loginRefresh;

        if (logindata === null) {
            console.debug("[REFRESH_FAILED]", "There are no tokens.");
            return {
                isSuccessful: false,
                data: undefined,
            };
        }

        if (params === undefined) {
            params = {
                expiredAccessToken: logindata.accessToken,
                refreshToken: logindata.refreshToken,
            };
        }

        const refresh = await this.request<any, RefreshResult>({
            method: "post",
            url: route,
            data: {
                expired_access_token: params.expiredAccessToken,
                refresh_token: params.refreshToken,
            },
        });

        if (!refresh.isSuccessful || refresh.data?.data === undefined) {
            console.debug("[REFRESH_ERROR]", refresh.data?.data);

            await storage.login.remove();
        } else {
            console.debug("[REFRESH]", "Tokens have been refreshed.");

            await storage.login.set({
                ...logindata,
                accessToken: refresh.data.data.access_token,
                accessTokenExpiresAt: refresh.data.data.expire_at,
            });
        }

        return refresh;
    }
}

export default AVillifeServerModule;
