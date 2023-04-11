import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Requestable, Responsable, Response } from "../types";

/* export default interface IVillifeRESTAPI extends Requestable {
    login(id: string, password: string): Response<any>;
    socialLogin(category: SocialLoginHostType, accessToken: string): Response<SocialLoginResultType>;
    join(): Response<any>;
    socialJoin(category: SocialLoginHostType, params: SocialJoinParamsType): Response<SocialJoinResultType>;
    refresh(params: RefreshParmas): Response<RefreshResult>;
}
 */
export type LoginResult = {
    access_token: string;
    expire_at: number;
    refresh_token: string;
}; // | "cannot find user" | undefined;

export type SocialLoginHostType = "naver";

export type SocialJoinResultType = "sign up has been done successfully" | "cannot find user" | "duplicate user";

export type Authority = {
    RENTER: 1;
    LANDLORD: 2;
    ADMIN: 3;
    SITE_ADMIN: 777;
};

export type SocialJoinParamsType = {
    id: string;
    password: string;
    access_token: string;
    authority: Authority[keyof Authority];
    //phone_number: string;
};

export type RegisterFirebaseTokenParams = {
    accessToken: string;
    refreshToken: string;
    firebaseToken: string;
};

export type RegisterFirebaseTokenResult =
    | "insert AccessToken to header and check format of request"
    | "input token to parameter"
    | "invalid token"
    | "server internal error";
//export type StardustsReturnType<T> = Promise<StardustsResultType<T>>;

export type RefreshParmas = {
    expiredAccessToken: string;
    refreshToken: string;
};

export type RefreshResult = {
    access_token: string;
    expire_at: number;
};
