import { Response } from "../../types";
import { Authority } from "../types";

export interface Loginable {
    login(id: string, password: string): Response<LoginResult>;
    socialLogin(host: SocialLoginHostType, accessToken: string): Response<LoginResult>;
    logout(): Promise<any>;
}

export interface Joinable {
    join(): Response<any>;
    socialJoin(host: SocialLoginHostType, params: SocialJoinParamsType): Response<SocialJoinResultType>;
}

export interface FirebaseAccessable {
    registerFirebaseToken(params: RegisterFirebaseTokenParams): Response<RegisterFirebaseTokenResult>;
}

export type LoginResult = {
    access_token: string;
    expire_at: number;
    refresh_token: string;
}; // | "cannot find user" | undefined;

export type SocialLoginHostType = "naver";

export type HostType = "villife" | SocialLoginHostType;

export type SocialJoinParamsType = {
    id: string;
    password: string;
    access_token: string;
    authority: Authority[keyof Authority];
    //phone_number: string;
};

export type SocialJoinResultType = "sign up has been done successfully" | "cannot find user" | "duplicate user";

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

export default interface IVillifeAuthManager extends Loginable, Joinable, FirebaseAccessable {}
