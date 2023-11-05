import { Response } from "../../types";
import { Authority } from "../types";

export default interface IVillifeAuthManager extends Loginable, Joinable, FirebaseAccessable, Verifiable {}
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

export interface Verifiable {
    verifyPersonalInfo(params: VerifyPersonalInfoParams): Response<string>;
    sendVerifyCode(params: SendVerifyCode): Response<string>;
}

export type SendVerifyCode = {
    phone_number: string;
};

export type VerifyPersonalInfoParams = {
    birth_day: string;
    birth_year: string;
    code: string;
    phone_number: string;
    user_name: string;
};

export type LoginResult = {
    access_token: string;
    expire_at: number;
    refresh_token: string;
}; // | "cannot find user" | undefined;

export type SocialLoginHostType = "apple" | "naver";

export type HostType = "villife" | SocialLoginHostType;

export type SocialJoinParamsType = {
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
