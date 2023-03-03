import { AxiosInstance, AxiosRequestConfig } from "axios";


export default interface IStardustsRestAPI {
    requester: AxiosInstance;
    request<T>(config: AxiosRequestConfig): StardustsResultType<T>;
    login(id: string, password: string): StardustsResultType<any>;
    socialLogin(category: SocialLoginCompanyType, access_token: string): 
        StardustsResultType<CustomSocialLoginResultType>;
    join(): StardustsResultType<any>;
    socialJoin(category: SocialLoginCompanyType, params: SocialJoinParamsType): StardustsResultType<SocialJoinResultType>;
}


export type SocialLoginCompanyType = "naver";

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

export type StardustsResultType<T> = Promise<{
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