import { AxiosRequestConfig } from "axios";
import { Requestable } from "../types";


export default interface IVillifeRESTAPI extends Requestable {
    request<T>(config: AxiosRequestConfig): VillifeResultType<T>;
    login(id: string, password: string): VillifeResultType<any>;
    socialLogin(category: SocialLoginHostType, accessToken: string): 
        VillifeResultType<CustomSocialLoginResultType>;
    join(): VillifeResultType<any>;
    socialJoin(category: SocialLoginHostType, params: SocialJoinParamsType): VillifeResultType<SocialJoinResultType>;
}


export type SocialLoginHostType = "naver";

export type SocialLoginResultType = {
    access_token: string;
    refresh_token: string;
} | "cannot find user" | undefined;

export type CustomSocialLoginResultType = {
    social: {
        access_token: string;
    };
    stardusts: SocialLoginResultType;
}

export type VillifeResultType<T> = Promise<{
    isSuccess: boolean;
    data: T
}>;

export type SocialJoinResultType = 
    "sign up has been done successfully" 
    | "cannot find user"
    | "duplicate user";

export type SocialJoinParamsType = {
    id: string;
    password: string;
    access_token: string;
    phone_number: string;
}
//export type StardustsReturnType<T> = Promise<StardustsResultType<T>>;