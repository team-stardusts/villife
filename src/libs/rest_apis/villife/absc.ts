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
    NETWORK_AUTHENTICATION_REQUIRED: 511,
} as const;

const env = new DotEnv();
console.log(env.api.villife.REST_API_BASE_URL);
class AVillifeServerModule extends AREST {
    readonly requester: AxiosInstance = axios.create({
        baseURL: env.api.villife.REST_API_BASE_URL,
        timeout: 1000,
        timeoutErrorMessage:
            "The request timed out.\
            Check the Stardusts server.",
    });

    readonly routes: RoutesType = routes;

    public async requestForTest<T>(param: T): ResponseForTest<T> {
        return Promise.resolve({
            isSuccessful: true,
            data: {
                data: param,
            },
        });
    }

    public async requestAuthable<T = any, U = any>(config: AxiosRequestConfig<T>): Response<U> {
        const storage = new VillifeStorage();
        const logindata = await storage.login.get();

        if (config.headers === undefined) {
            config.headers = {};
        }

        config.headers.Authorization = `Bearer ${logindata?.accessToken}`;

        const result = await this.request<any, U>(config);

        if (logindata === null) {
            console.debug("Villife logindta is null");
            return result;
        }

        if (result.data?.status != RESPONSE_STATUS.NETWORK_AUTHENTICATION_REQUIRED) {
            return result;
        } else {
            const refresh = await this.refresh({
                expiredAccessToken: logindata.accessToken,
                refreshToken: logindata.refreshToken,
            });

            if (refresh.data?.data.access_token === undefined) {
                console.debug("Failed to refresh on VillifeServer.");
            }

            config.headers.Authorization = `Bearer ${refresh.data?.data.access_token}`;

            await storage.login.set({
                ...logindata,
                accessToken: refresh.data?.data.access_token ?? "",
                accessTokenExpiresAt: refresh.data?.data.expire_at ?? 0,
            });
        }

        return await this.request<any, U>(config);
    }

    public async refresh(params: RefreshParmas): Response<RefreshResult> {
        let route: string = this.routes.loginRefresh;

        return await this.request<any, RefreshResult>({
            method: "post",
            url: route,
            data: {
                expired_access_token: params.expiredAccessToken,
                refresh_token: params.refreshToken,
            },
        });
    }
}

export default AVillifeServerModule;
