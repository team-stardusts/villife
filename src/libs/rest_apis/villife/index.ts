import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import AREST from "../absc";
import routes from "./routes";
import { RoutesType } from "./routes/types";
import {
    Authority,
    LoginResult,
    RefreshParmas,
    RefreshResult,
    RegisterFirebaseTokenParams,
    RegisterFirebaseTokenResult,
    SocialJoinParamsType,
    SocialJoinResultType,
    SocialLoginHostType,
} from "./types";
import { Response } from "../types";
import DotEnv from "../../dotenv";
import VillifeStorage from "../../../hooks/storage";

export const VILLIFE_AUTHORITY: Authority = {
    RENTER: 1,
    LANDLORD: 2,
    ADMIN: 3,
    SITE_ADMIN: 777,
} as const;

class VillifeServer extends AREST {
    private env: DotEnv = new DotEnv();
    private readonly storage = new VillifeStorage();

    readonly requester: AxiosInstance = axios.create({
        baseURL: "http://13.125.190.36:8080/", //this.env.api.villife.REST_API_BASE_URL,
        timeout: 1000,
        timeoutErrorMessage:
            "The request timed out.\
            Check the Stardusts server.",
    });

    readonly routes: RoutesType = routes;

    public async login(id: string, password: string): Response<LoginResult> {
        let route: string = routes.login;

        return await this.request<any, LoginResult>({
            method: "post",
            url: route,
            data: {
                id,
                password,
            },
        });
    }

    public async logout(): Promise<boolean> {
        return await this.storage.login.set(null);
    }

    public async socialLogin(category: SocialLoginHostType, accessToken: string): Response<LoginResult> {
        let route: string;

        switch (category) {
            case "naver":
                route = this.routes.naverSocialLogin;
            default:
                // Social login 추가 시 여기에 Route 추가
                route = this.routes.naverSocialLogin;
        }

        return await this.request<any, LoginResult>({
            method: "post",
            url: route,
            data: { access_token: accessToken },
        });
    }

    public async join(): Promise<any> {}

    public async registerFirebaseToken(params: RegisterFirebaseTokenParams): Response<RegisterFirebaseTokenResult> {
        const route = routes.registerFirebaseToken;

        const result = await this.request<any, RegisterFirebaseTokenResult>({
            url: route,
            method: "get",
            headers: {
                //"Content-Type": "application/json",
                Authorization: "Bearer " + "", //params.accessToken,
            },
            params: {
                firebase_token: params.firebaseToken,
            },
        });

        if (!result.isSuccessful) {
            const refreshResult = await this.refresh({
                expiredAccessToken: params.accessToken,
                refreshToken: params.refreshToken,
            });

            return await this.request<any, RegisterFirebaseTokenResult>({
                url: route,
                method: "get",
                headers: {
                    Authorization: "Bearer " + refreshResult.data?.data.access_token,
                },
                params: {
                    firebase_token: params.firebaseToken,
                },
            });
        }

        return result;
    }

    public async socialJoin(
        category: SocialLoginHostType,
        params: SocialJoinParamsType
    ): Response<SocialJoinResultType> {
        let route: string;

        switch (category) {
            case "naver":
                route = this.routes.naverSocialJoin;
            default:
                // Social login 추가 시 여기에 Route 추가
                route = this.routes.naverSocialJoin;
        }

        return await this.request<any, SocialJoinResultType>({
            method: "post",
            url: route,
            data: params,
        });
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

export default VillifeServer;
