import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import AREST from "../absc";
import routes from "./routes";
import { RoutesType } from "./routes/types";
import {
    Authority,
    CreateNoticeParams,
    DeleteNoticeParams,
    GetNoticesResult,
    LoginResult,
    RefreshParmas,
    RefreshResult,
    RegisterFirebaseTokenParams,
    RegisterFirebaseTokenResult,
    SocialJoinParamsType,
    SocialJoinResultType,
    SocialLoginHostType,
    UpdateNoticeParams,
} from "./types";
import { Responsable, Response } from "../types";
import DotEnv from "../../dotenv";
import VillifeStorage from "../../storage";
import { MediaUploadResult } from "./types";

export const VILLIFE_AUTHORITY: Authority = {
    RENTER: 1,
    LANDLORD: 2,
    ADMIN: 3,
    SITE_ADMIN: 777,
} as const;

const RESPONSE_STATUS = {
    NETWORK_AUTHENTICATION_REQUIRED: 511,
};

class VillifeServer extends AREST {
    private env: DotEnv = new DotEnv();

    readonly requester: AxiosInstance = axios.create({
        baseURL: "http://13.125.190.36:8080/", // this.env.api.villife.REST_API_BASE_URL,
        timeout: 1000,
        timeoutErrorMessage:
            "The request timed out.\
            Check the Stardusts server.",
    });

    readonly routes: RoutesType = routes;

    getBaseURL(): string {
        if (!this.env.api.villife.REST_API_BASE_URL) {
            throw new Error("cannotget env");
        }
        return this.env.api.villife.REST_API_BASE_URL;
    }

    //[TO-DO] logindata === null 인 경우의 예외가 필요함
    private async requestWithAuthentication<T = any, U = any>(config: AxiosRequestConfig<T>): Promise<Responsable<U>> {
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

        // ISSUE : 두번 리퀘스트를 보냄, 이거 의도한거 맞는지 확인 바람 , return result 가 되어야 할 것 같은데
        return await this.request<any, U>(config);
    }

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
        return await new VillifeStorage().login.set(null);
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

        return await this.requestWithAuthentication<any, RegisterFirebaseTokenResult>({
            url: route,
            method: "get",
            params: {
                firebase_token: params.firebaseToken,
            },
        });
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

    public async uploadImage(formData: FormData): Response<MediaUploadResult> {
        let route: string = this.routes.uploadImage;
        /* const logindata = await this.storage.login.get();
        if (!logindata) {
            console.log("request uploading images api, login data :", logindata);
            Promise.reject(new Error("Login data not found"));
        }
        console.log("request uploading images api, login data :", logindata); */

        return await this.requestWithAuthentication<any, MediaUploadResult>({
            method: "post",
            url: route,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        });
    }

    public async getNotices(buildingID: number): Response<GetNoticesResult> {
        let route: string = this.routes.getNoticesByBuildingID + `?building_id=${buildingID}`;

        return await this.requestWithAuthentication<any, GetNoticesResult>({
            method: "get",
            url: route,
        });
    }

    /**
     * @param CreateNoticeParams
     * @warn olny admin can use this api, should check authority before invoke this api
     */
    public async createNotice(params: CreateNoticeParams): Response<string> {
        let route: string = this.routes.createNotice;

        return await this.requestWithAuthentication<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
    /**
     * @param UpdateNoticeParams
     * @warn olny admin can use this api, should check authority before invoke this api
     */
    public async UpdateNotice(params: UpdateNoticeParams): Response<string> {
        let route: string = this.routes.updateNotice;

        return await this.requestWithAuthentication<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }

    /**
     * @param DeleteNoticeParams
     * @warn olny admin can use this api, should check authority before invoke this api
     */
    public async deleteNotice(params: DeleteNoticeParams): Response<string> {
        let route: string = this.routes.deleteNotice;

        return await this.requestWithAuthentication<any, string>({
            method: "post",
            url: route,
            data: params,
        });
    }
}

export default VillifeServer;
