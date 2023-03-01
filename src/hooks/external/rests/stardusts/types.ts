import { AxiosInstance, AxiosRequestConfig } from "axios";


export default interface IStardustsRestAPI {
    requester: AxiosInstance;
    request<T>(config: AxiosRequestConfig): Promise<StardustsResultType<T>>;
    login(id: string, password: string): Promise<any>;
    socialLogin(category: SocialLoginCompanyType, access_token: string): 
        Promise<StardustsResultType<SocialLoginReturnType>>;
    join(): Promise<any>
}

export type SocialLoginCompanyType = "naver";

export type SocialLoginReturnType = {
    access_token: string;
    refresh_token: string;
} | "cannot find user";

export type StardustsResultType<T> = {
    isSuccess: boolean;
    data: T
};